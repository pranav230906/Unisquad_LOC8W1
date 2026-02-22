import React, { useState } from "react";
import { Mic, MicOff, Trash2, Search, MapPin, Calendar } from "lucide-react";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import Select from "../../components/ui/Select.jsx";
import Input from "../../components/ui/Input.jsx";
import { Spinner } from "../../components/ui/Loader.jsx";
import { startSpeechToText } from "../../services/voiceService.js";
import { createJob } from "../../services/jobService.js";
import { useToast } from "../../context/ToastContext.jsx";
import { useNavigate } from "react-router-dom";

const SKILLS = ["Electrician", "Plumber", "Carpenter", "Painter", "Mechanic", "Cleaner", "Cook"];
const LANGS = [
  { value: "hi-IN", label: "हिंदी (Hindi)" },
  { value: "mr-IN", label: "मराठी (Marathi)" },
  { value: "te-IN", label: "తెలుగు (Telugu)" },
  { value: "en-IN", label: "English (India)" },
];

export default function VoicePostJob() {
  const [lang, setLang] = useState("hi-IN");
  const [listening, setListening] = useState(false);
  const [partial, setPartial] = useState("");
  const [finalText, setFinalText] = useState("");
  const [skill, setSkill] = useState("Electrician");
  const [address, setAddress] = useState("");
  const [whenText, setWhenText] = useState("");
  const [radiusKm, setRadiusKm] = useState(5);
  const { showToast } = useToast();
  const nav = useNavigate();

  async function onStartVoice() {
    try {
      setPartial(""); setFinalText(""); setListening(true);
      await startSpeechToText({
        lang,
        onPartial: (t) => setPartial(t),
        onFinal: (t) => { setFinalText(t); setListening(false); },
      });
    } catch (e) {
      setListening(false);
      showToast(e.message || "Voice not supported. Please use Chrome.", "error");
    }
  }

  async function onFindWorkers() {
    try {
      const job = await createJob({
        skill, date: "TBD", time: "TBD",
        address: address || "Parsed from voice",
        notes: finalText ? `VOICE: ${finalText}` : "",
        radiusKm, whenText,
      });
      showToast("Job created — choosing a worker now.", "success");
      nav("/client/workers", { state: { jobId: job.id, skill, radiusKm } });
    } catch (e) {
      showToast(e.message || "Failed to create job", "error");
    }
  }

  const canSubmit = !!skill && (!!address || !!finalText);

  return (
    <div className="space-y-5">

      {/* Voice input panel */}
      <Card
        title="Voice Job Posting"
        subtitle='Speak your requirement. Example: "मुझे कल electrician चाहिए"'
        icon={<Mic className="w-5 h-5" />}
      >
        <div className="space-y-4">
          {/* Language + mic controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <Select
                label="Language"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
              >
                {LANGS.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                variant={listening ? "danger" : "primary"}
                onClick={onStartVoice}
                disabled={listening}
                size="md"
              >
                {listening ? (
                  <><Spinner size="sm" color="text-white" /><span>Listening…</span></>
                ) : (
                  <><Mic className="w-5 h-5" /><span>Start Voice</span></>
                )}
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => { setPartial(""); setFinalText(""); }}
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            </div>
          </div>

          {/* Transcript display */}
          <div className={`rounded-[10px] border-2 min-h-[80px] p-4 transition-colors ${listening
            ? "border-[#1E3A8A] bg-[#eff6ff]"
            : "border-[#E5E7EB] bg-[#F3F4F6]"
            }`}>
            {partial && (
              <p className="text-sm text-[#6B7280] italic mb-1">{partial}</p>
            )}
            {finalText ? (
              <p className="text-base font-medium text-[#111827]">"{finalText}"</p>
            ) : !partial ? (
              <p className="text-sm text-[#9CA3AF] select-none">
                {listening ? "Listening — speak now…" : "Tap Start Voice to begin"}
              </p>
            ) : null}
          </div>
        </div>
      </Card>

      {/* Manual fallback details */}
      <Card
        title="Job Details"
        subtitle="Fill in manually or use voice above"
        icon={<Search className="w-5 h-5" />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Service needed"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            required
          >
            {SKILLS.map((s) => <option key={s}>{s}</option>)}
          </Select>

          <Input
            label="Search radius (km)"
            type="number"
            min={1}
            max={20}
            value={radiusKm}
            onChange={(e) => setRadiusKm(Number(e.target.value))}
            leftIcon={<MapPin className="w-5 h-5" />}
          />

          <Input
            label="When?"
            placeholder="Today 6pm / Tomorrow morning"
            value={whenText}
            onChange={(e) => setWhenText(e.target.value)}
            leftIcon={<Calendar className="w-5 h-5" />}
          />

          <Input
            label="Address"
            placeholder="House no, area, city"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            leftIcon={<MapPin className="w-5 h-5" />}
            required
          />
        </div>

        <div className="mt-5 flex justify-end">
          <Button disabled={!canSubmit} onClick={onFindWorkers} size="md">
            <Search className="w-5 h-5" />
            Find Workers
          </Button>
        </div>
      </Card>

      {/* Demo note */}
      <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-[10px] p-4">
        <p className="text-xs font-semibold text-[#1e40af] mb-0.5">Demo mode</p>
        <p className="text-xs text-[#6B7280]">
          Voice uses browser SpeechRecognition API (Chrome only). Backend will use Whisper + intent extraction.
        </p>
      </div>
    </div>
  );
}