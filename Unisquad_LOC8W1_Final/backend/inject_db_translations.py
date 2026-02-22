import json

en_db = {
    "electrical_setup": "Electrical Setup",
    "ac_maintenance": "AC Maintenance",
    "sofa_cleaning": "Sofa Cleaning",
    "verma_apt_sec62": "Verma Apartment • Sector 62, Noida",
    "tech_park_sec125": "Tech Park • Sector 125, Noida",
    "sunset_blvd_delhi": "Sunset Blvd • Delhi",
    "dist_1_2km": "1.2 km away",
    "dist_2_5km": "2.5 km away",
    "dist_3_0km": "3.0 km away",
    "time_11_30am": "11:30 AM • Today",
    "time_02_00pm": "02:00 PM • Today",
    "sharma_res_sec15": "Sharma Residence • Sector 15, Noida"
}

hi_db = {
    "electrical_setup": "इलेक्ट्रिकल सेटअप",
    "ac_maintenance": "एसी रखरखाव",
    "sofa_cleaning": "सोफा सफाई",
    "verma_apt_sec62": "वर्मा अपार्टमेंट • सेक्टर 62, नोएडा",
    "tech_park_sec125": "टेक पार्क • सेक्टर 125, नोएडा",
    "sunset_blvd_delhi": "सनसेट बुलेवार्ड • दिल्ली",
    "dist_1_2km": "1.2 किमी दूर",
    "dist_2_5km": "2.5 किमी दूर",
    "dist_3_0km": "3.0 किमी दूर",
    "time_11_30am": "सुबह 11:30 बजे • आज",
    "time_02_00pm": "दोपहर 02:00 बजे • आज",
    "sharma_res_sec15": "शर्मा निवास • सेक्टर 15, नोएडा"
}

mr_db = {
    "electrical_setup": "इलेक्ट्रिकल सेटअप",
    "ac_maintenance": "एसी देखभाल",
    "sofa_cleaning": "सोफा साफ करणे",
    "verma_apt_sec62": "वर्मा अपार्टमेंट • सेक्टर 62, नोएडा",
    "tech_park_sec125": "टेक पार्क • सेक्टर 125, नोएडा",
    "sunset_blvd_delhi": "सनसेट बुलेव्हार्ड • दिल्ली",
    "dist_1_2km": "1.2 किमी दूर",
    "dist_2_5km": "2.5 किमी दूर",
    "dist_3_0km": "3.0 किमी दूर",
    "time_11_30am": "सकाळी 11:30 • आज",
    "time_02_00pm": "दुपारी 02:00 • आज",
    "sharma_res_sec15": "शर्मा निवास • सेक्टर 15, नोएडा"
}

te_db = {
    "electrical_setup": "ఎలక్ట్రికల్ సెటప్",
    "ac_maintenance": "ఏసీ నిర్వహణ",
    "sofa_cleaning": "సోఫా క్లీనింగ్",
    "verma_apt_sec62": "వర్మ అపార్ట్మెంట్ • సెక్టర్ 62, నోయిడా",
    "tech_park_sec125": "టెక్ పార్క్ • సెక్టర్ 125, నోయిడా",
    "sunset_blvd_delhi": "సన్సెట్ బౌలేవార్డ్ • ఢిల్లీ",
    "dist_1_2km": "1.2 కి.మీ దూరంలో",
    "dist_2_5km": "2.5 కి.మీ దూరంలో",
    "dist_3_0km": "3.0 కి.మీ దూరంలో",
    "time_11_30am": "ఉదయం 11:30 • ఈరోజు",
    "time_02_00pm": "మధ్యాహ్నం 02:00 • ఈరోజు",
    "sharma_res_sec15": "శర్మ నివాసం • సెక్టర్ 15, నోయిడా"
}

ta_db = {
    "electrical_setup": "மின்சார அமைப்பு",
    "ac_maintenance": "ஏசி பராமரிப்பு",
    "sofa_cleaning": "சோபா சுத்தம்",
    "verma_apt_sec62": "வர்மா குடியிருப்பு • செக்டார் 62, நொய்டா",
    "tech_park_sec125": "டெக் பார்க் • செக்டார் 125, நொய்டா",
    "sunset_blvd_delhi": "சன்செட் பவுல்வர்டு • டெல்லி",
    "dist_1_2km": "1.2 கிமீ தொலைவில்",
    "dist_2_5km": "2.5 கிமீ தொலைவில்",
    "dist_3_0km": "3.0 கிமீ தொலைவில்",
    "time_11_30am": "காலை 11:30 • இன்று",
    "time_02_00pm": "பிற்பகல் 02:00 • இன்று",
    "sharma_res_sec15": "சர்மா இல்லம் • செக்டார் 15, நொய்டா"
}

bn_db = {
    "electrical_setup": "বৈদ্যুতিক সেটআপ",
    "ac_maintenance": "এসি রক্ষণাবেক্ষণ",
    "sofa_cleaning": "সোফা ক্লিনিং",
    "verma_apt_sec62": "ভার্মা অ্যাপার্টমেন্ট • সেক্টর ৬২, নয়ডা",
    "tech_park_sec125": "টেক পার্ক • সেক্টর ১২৫, নয়ডা",
    "sunset_blvd_delhi": "সানসেট বলেভার্ড • দিল্লি",
    "dist_1_2km": "১.২ কিমি দূরে",
    "dist_2_5km": "২.৫ কিমি দূরে",
    "dist_3_0km": "৩.০ কিমি দূরে",
    "time_11_30am": "সকাল ১১:৩০ • আজ",
    "time_02_00pm": "দুপুর ০২:০০ • আজ",
    "sharma_res_sec15": "শর্মা বাসভবন • সেক্টর ১৫, নয়ডা"
}

gu_db = {
    "electrical_setup": "ઇલેક્ટ્રિકલ સેટઅપ",
    "ac_maintenance": "એસી જાળવણી",
    "sofa_cleaning": "સોફા સફાઈ",
    "verma_apt_sec62": "વર્મા એપાર્ટમેન્ટ • સેક્ટર 62, નોઈડા",
    "tech_park_sec125": "ટેક પાર્ક • સેક્ટર 125, નોઈડા",
    "sunset_blvd_delhi": "સનસેટ બુલવર્ડ • દિલ્હી",
    "dist_1_2km": "1.2 કિમી દૂર",
    "dist_2_5km": "2.5 કિમી દૂર",
    "dist_3_0km": "3.0 કિમી દૂર",
    "time_11_30am": "સવારે 11:30 • આજે",
    "time_02_00pm": "બપોરે 02:00 • આજે",
    "sharma_res_sec15": "શર્મા નિવાસસ્થાન • સેક્ટર 15, નોઈડા"
}

kn_db = {
    "electrical_setup": "ವಿದ್ಯುತ್ ಸೆಟಪ್",
    "ac_maintenance": "ಎಸಿ ನಿರ್ವಹಣೆ",
    "sofa_cleaning": "ಸೋಫಾ ಶುಚಿಗೊಳಿಸುವಿಕೆ",
    "verma_apt_sec62": "ವರ್ಮಾ ಅಪಾರ್ಟ್ಮೆಂಟ್ • ಸೆಕ್ಟರ್ 62, ನೋಯ್ಡಾ",
    "tech_park_sec125": "ಟೆಕ್ ಪಾರ್ಕ್ • ಸೆಕ್ಟರ್ 125, ನೋಯ್ಡಾ",
    "sunset_blvd_delhi": "ಸನ್‌ಸೆಟ್ ಬೌಲೆವಾರ್ಡ್ • ದೆಹಲಿ",
    "dist_1_2km": "1.2 ಕಿಮೀ ದೂರದಲ್ಲಿ",
    "dist_2_5km": "2.5 ಕಿಮೀ ದೂರದಲ್ಲಿ",
    "dist_3_0km": "3.0 ಕಿಮೀ ದೂರದಲ್ಲಿ",
    "time_11_30am": "ಬೆಳಿಗ್ಗೆ 11:30 • ಇಂದು",
    "time_02_00pm": "ಮಧ್ಯಾಹ್ನ 02:00 • ಇಂದು",
    "sharma_res_sec15": "ಶರ್ಮಾ ನಿವಾಸ • ಸೆಕ್ಟರ್ 15, ನೋಯ್ಡಾ"
}

ml_db = {
    "electrical_setup": "ഇലക്‌ട്രിക്കൽ സജ്ജീകരണം",
    "ac_maintenance": "എസി അറ്റകുറ്റപ്പണി",
    "sofa_cleaning": "സോഫ വൃത്തിയാക്കൽ",
    "verma_apt_sec62": "വർമ്മ അപ്പാർട്ട്മെന്റ് • സെക്ടർ 62, നോയിഡ",
    "tech_park_sec125": "ടെക് പാർക്ക് • സെക്ടർ 125, നോയിഡ",
    "sunset_blvd_delhi": "സൺസെറ്റ് ബൊലേവാർഡ് • ഡൽഹി",
    "dist_1_2km": "1.2 കി.മീ അകലെ",
    "dist_2_5km": "2.5 കി.മീ അകലെ",
    "dist_3_0km": "3.0 കി.മീ അകലെ",
    "time_11_30am": "രാവിലെ 11:30 • ഇന്ന്",
    "time_02_00pm": "ഉച്ചയ്ക്ക് 02:00 • ഇന്ന്",
    "sharma_res_sec15": "ശർമ്മ വസതി • സെക്ടർ 15, നോയിഡ"
}

with open(r"d:\LOC 8.0\Unisquad_LOC8W1\Unisquad_LOC8W1_Final\frontend\src\utils\translations.js", "r", encoding="utf-8") as f:
    text = f.read()

json_str = text.split("export const translations = ")[1].split(";\n")[0]
langs = json.loads(json_str)

langs["en"].update(en_db)
langs["hi"].update(hi_db)
langs["mr"].update(mr_db)
langs["te"].update(te_db)
langs["ta"].update(ta_db)
langs["bn"].update(bn_db)
langs["gu"].update(gu_db)
langs["kn"].update(kn_db)
langs["ml"].update(ml_db)

output = "export const translations = " + json.dumps(langs, indent=2, ensure_ascii=False) + ";\n"
output += "\n// TODO: Replace with backend-driven translation service if required\n"

with open(r"d:\LOC 8.0\Unisquad_LOC8W1\Unisquad_LOC8W1_Final\frontend\src\utils\translations.js", "w", encoding="utf-8") as f:
    f.write(output)
