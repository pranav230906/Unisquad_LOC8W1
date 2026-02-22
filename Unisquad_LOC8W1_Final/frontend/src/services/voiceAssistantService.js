/**
 * Voice Assistant Service
 * -----------------------
 * Captures audio from the worker's microphone using MediaRecorder.
 * The audio blob is then sent to the backend `/api/v1/voice/process` endpoint.
 * The backend handles translation from regional Indian languages to English 
 * using the Sarvam AI API and responds with the detected intent.
 */

export class VoiceAssistant {
    static isListening = false;
    static mediaRecorder = null;
    static audioChunks = [];

    static async startListening() {
        if (this.isListening) return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];

            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.audioChunks.push(event.data);
                }
            };

            this.mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                await this.sendAudioToBackend(audioBlob);

                // Stop the tracks to turn off the actual mic hardware indicator
                stream.getTracks().forEach(track => track.stop());
            };

            this.mediaRecorder.start();
            this.isListening = true;
            window.dispatchEvent(new CustomEvent('voice-status', { detail: { active: true } }));
        } catch (error) {
            console.error("Microphone access denied or error:", error);
            alert("Microphone access is required to use the voice assistant.");
        }
    }

    static stopListening() {
        if (this.mediaRecorder && this.isListening) {
            this.mediaRecorder.stop();
            this.isListening = false;
            window.dispatchEvent(new CustomEvent('voice-status', { detail: { active: false } }));
        }
    }

    static async sendAudioToBackend(audioBlob) {
        try {
            const formData = new FormData();
            // Appending as webm file, which most modern browsers capture when using MediaRecorder
            formData.append('file', audioBlob, 'voice_command.webm');

            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

            console.log("Sending audio to backend for Sarvam AI Translation...");

            const response = await fetch(`${API_BASE_URL}/voice/process`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("[Backend Response via Sarvam AI]", data);

                if (data.intent) {
                    this.dispatchIntent(data.intent, data.payload);
                } else if (data.translated_text) {
                    // Failsafe: if backend doesn't deduce intent but returns text, parse locally
                    this.processTextCommand(data.translated_text);
                } else {
                    console.log("[Voice Command] No intent detected and no text translated.");
                }
            } else {
                console.error("Error from backend Voice API", await response.text());
            }
        } catch (error) {
            console.error("Failed to send audio to backend", error);
        }
    }

    static dispatchIntent(intent, payload) {
        console.log(`[Voice Command] Intent Dispatched: ${intent}`, payload);
        window.dispatchEvent(new CustomEvent('voice-command', { detail: { intent, payload } }));
    }

    static processTextCommand(text) {
        let intent = null;
        let payload = null;
        text = text.toLowerCase();

        // Fallback NLP parsing if the backend didn't provide strict intent tags
        if (text.includes("available") || text.includes("toggle available") || text.includes("offline")) {
            intent = "TOGGLE_AVAILABLE";
        }
        else if (text.includes("navigation") || text.includes("navigate") || text.includes("start trip")) {
            intent = "START_NAVIGATION";
        }
        else if (text.includes("completed") || text.includes("done") || text.includes("finish") || text.includes("mark as complete")) {
            intent = "COMPLETE_JOB";
        }
        else if (text.includes("accept") && text.includes("job")) {
            intent = "ACCEPT_JOB";
            payload = { jobQuery: text.replace("accept", "").replace("job", "").trim() };
        }
        else if (text.includes("open") && text.includes("settings")) {
            intent = "OPEN_TAB"; payload = { tab: "settings" };
        }
        else if (text.includes("open") && text.includes("jobs")) {
            intent = "OPEN_TAB"; payload = { tab: "jobs" };
        }
        else if (text.includes("open") && text.includes("schedule")) {
            intent = "OPEN_TAB"; payload = { tab: "schedule" };
        }
        else if (text.includes("open") && text.includes("earnings")) {
            intent = "OPEN_TAB"; payload = { tab: "earnings" };
        }
        else if (text.includes("open") && text.includes("reviews")) {
            intent = "OPEN_TAB"; payload = { tab: "reviews" };
        }
        else if (text.includes("open") && text.includes("profile")) {
            intent = "OPEN_TAB"; payload = { tab: "profile" };
        }

        if (intent) {
            this.dispatchIntent(intent, payload);
        } else {
            console.log("[Voice Command] Command not recognized from fallback.");
        }
    }
}
