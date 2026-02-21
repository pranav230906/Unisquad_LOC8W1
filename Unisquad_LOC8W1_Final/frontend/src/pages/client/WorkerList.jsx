import React, { useState } from "react";
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import Select from "../../components/common/Select.jsx";
import Input from "../../components/common/Input.jsx";
import { startSpeechToText } from "../../services/voiceService.js";
import { createJob } from "../../services/jobService.js";
import { useToast } from "../../context/ToastContext.jsx";
import { useNavigate } from "react-router-dom";

function VoicePostJob() {
  const [lang, setLang] = useState("hi-IN");
  const [listening, setListening] = useState(false);
  const [partial, setPartial] = useState("");
  const [finalText, setFinalText] = useState("");

  // manual fallback fields (for demo)
  const [skill, setSkill] = useState("Electrician");
  const [address, setAddress] = useState("");
  const [whenText, setWhenText] = useState("");
  const [radiusKm, setRadiusKm] = useState(5);

  const { showToast } = useToast();
  const nav = useNavigate();

  async function onStartVoice() {
    try {
      setPartial("");
      setFinalText("");
      setListening(true);

      await startSpeechToText({
        lang,
        onPartial: (t) => setPartial(t),
        onFinal: (t) => {
          setFinalText(t);
          setListening(false);
        },
      });
    } catch (e) {
      setListening(false);
      showToast(e.message || "Voice not supported. Use Chrome.", "error");
    }
  }

  async function onFindWorkers() {
    try {
      const job = await createJob({
        skill,
        date: "TBD",
        time: "TBD",
        address: address || "From voice (to be parsed)",
        notes: finalText ? `VOICE: ${finalText}` : "",
        radiusKm,
        whenText, // extra field (future: schema)
      });

      showToast("Voice job created (mock). Choose a worker.", "success");
      nav("/client/workers", { state: { jobId: job.id, skill, radiusKm } });
    } catch (e) {
      showToast(e.message || "Failed to create job", "error");
    }
  }

  return (
    <div className="space-y-4">
      <Card
        title="Voice Post a Job"
        subtitle="Demo uses browser SpeechRecognition. Later: backend /voice (Whisper + intent extraction)."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Language" value={lang} onChange={(e) => setLang(e.target.value)}>
            <option value="hi-IN">Hindi (hi-IN)</option>
            <option value="mr-IN">Marathi (mr-IN)</option>
            <option value="te-IN">Telugu (te-IN)</option>
            <option value="en-IN">English (en-IN)</option>
          </Select>

          <Input
            label="Search Radius (km)"
            type="number"
            min={1}
            max={10}
            value={radiusKm}
            onChange={(e) => setRadiusKm(Number(e.target.value))}
          />

          <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-900">Speak your requirement</div>
            <div className="mt-1 text-sm text-slate-600">
              Example: “मुझे कल 5 बजे electrician चाहिए, address XYZ…”
            </div>

            <div className="mt-3 flex gap-2">
              <Button onClick={onStartVoice} disabled={listening}>
                {listening ? "Listening..." : "Start Voice"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setPartial("");
                  setFinalText("");
                }}
              >
                Clear
              </Button>
            </div>

            {(partial || finalText) && (
              <div className="mt-4 space-y-2">
                {partial ? <div className="text-xs text-slate-500">Partial: {partial}</div> : null}
                {finalText ? <div className="text-sm text-slate-900">Final: {finalText}</div> : null}
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <div className="text-sm font-semibold text-slate-900">Quick Details (manual fallback)</div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select label="Service" value={skill} onChange={(e) => setSkill(e.target.value)}>
                <option>Electrician</option>
                <option>Plumber</option>
                <option>Carpenter</option>
                <option>Painter</option>
                <option>Mechanic</option>
              </Select>

              <Input label="When?" placeholder="Today 6pm" value={whenText} onChange={(e) => setWhenText(e.target.value)} />
              <Input
                className="md:col-span-2"
                label="Address"
                placeholder="House no, area, city"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mt-4 flex justify-end">
              <Button disabled={!skill || (!address && !finalText)} onClick={onFindWorkers}>
                Find Workers
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default VoicePostJob;