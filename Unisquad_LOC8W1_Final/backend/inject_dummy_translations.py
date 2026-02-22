import json
import re

en_dummy = {
    "pending": "Pending", "bathroom_plumbing": "Bathroom Plumbing", "kitchen_renovation": "Kitchen Renovation",
    "light_fixture_install": "Light Fixture Installation", "ac_repair": "AC Repair", "plumbing_repair": "Plumbing Repair",
    "sharma_residence": "Sharma Residence", "sink_leaking_desc": "Kitchen sink leaking, needs immediate attention",
    "sector_15_noida": "Sector 15, Noida", "today_10am": "10:00 AM • Today", "electrical_wiring": "Electrical Wiring",
    "verma_apartment": "Verma Apartment", "ceiling_fan_desc": "Install new ceiling fan and replace switch boards",
    "indirapuram_ghaziabad": "Indirapuram, Ghaziabad", "today_2pm": "2:00 PM • Today", "plumbing_category": "Plumbing",
    "electrical_category": "Electrical", "roof_repair": "Roof Repair", "mehta_residence": "Mehta Residence",
    "feb_22": "Feb 22, 2026", "9_am": "9:00 AM", "scheduled": "scheduled", "garden_maintenance": "Garden Maintenance",
    "joshi_villa": "Joshi Villa", "feb_23": "Feb 23, 2026", "2_pm": "2:00 PM", "kumar_family": "Kumar Family",
    "excellent_work_desc": "Excellent work! Very professional and completed the job quickly.", "feb_20": "Feb 20, 2026",
    "feb_19": "Feb 19, 2026", "feb_18": "Feb 18, 2026", "feb_17": "Feb 17, 2026", "rajesh_kumar": "Rajesh Kumar",
    "prof_worker": "Professional Worker", "rating_48": "4.8 Rating", "jobs_127": "127 Jobs", "reviews_98": "98 Reviews",
    "ac_service_category": "AC Service", "carpentry_category": "Carpentry", "english_lang": "English", "hindi_lang": "Hindi",
    "tamil_lang": "Tamil"
}

hi_dummy = {
    "pending": "लंबित", "bathroom_plumbing": "बाथरूम प्लंबिंग", "kitchen_renovation": "रसोई नवीनीकरण",
    "light_fixture_install": "लाइट फिक्स्चर स्थापना", "ac_repair": "एसी मरम्मत", "plumbing_repair": "प्लंबिंग मरम्मत",
    "sharma_residence": "शर्मा निवास", "sink_leaking_desc": "किचन सिंक लीक हो रहा है, तुरंत ध्यान देने की आवश्यकता है",
    "sector_15_noida": "सेक्टर 15, नोएडा", "today_10am": "सुबह 10:00 बजे • आज", "electrical_wiring": "विद्युत वायरिंग",
    "verma_apartment": "वर्मा अपार्टमेंट", "ceiling_fan_desc": "नया सीलिंग फैन लगाएं और स्विच बोर्ड बदलें",
    "indirapuram_ghaziabad": "इंदिरापुरम, गाजियाबाद", "today_2pm": "दोपहर 2:00 बजे • आज", "plumbing_category": "प्लंबिंग",
    "electrical_category": "इलेक्ट्रिकल", "roof_repair": "छत मरम्मत", "mehta_residence": "मेहता निवास",
    "feb_22": "22 फ़रवरी, 2026", "9_am": "सुबह 9:00 बजे", "scheduled": "निर्धारित", "garden_maintenance": "बगीचे का रखरखाव",
    "joshi_villa": "जोशी विला", "feb_23": "23 फ़रवरी, 2026", "2_pm": "दोपहर 2:00 बजे", "kumar_family": "कुमार परिवार",
    "excellent_work_desc": "उत्कृष्ट काम! बहुत पेशेवर और काम जल्दी पूरा किया।", "feb_20": "20 फ़रवरी, 2026",
    "feb_19": "19 फ़रवरी, 2026", "feb_18": "18 फ़रवरी, 2026", "feb_17": "17 फ़रवरी, 2026", "rajesh_kumar": "राजेश कुमार",
    "prof_worker": "पेशेवर कर्मचारी", "rating_48": "4.8 रेटिंग", "jobs_127": "127 नौकरियां", "reviews_98": "98 समीक्षाएं",
    "ac_service_category": "एसी सेवा", "carpentry_category": "बढ़ईगिरी", "english_lang": "अंग्रेजी", "hindi_lang": "हिंदी",
    "tamil_lang": "तमिल"
}

mr_dummy = {
    "pending": "प्रलंबित", "bathroom_plumbing": "बाथरूम प्लंबिंग", "kitchen_renovation": "स्वयंपाकघर नूतनीकरण",
    "light_fixture_install": "लाइट फिक्स्चर स्थापना", "ac_repair": "एसी दुरुस्ती", "plumbing_repair": "प्लंबिंग दुरुस्ती",
    "sharma_residence": "शर्मा निवास", "sink_leaking_desc": "स्वयंपाकघरातील सिंक गळती, त्वरित लक्ष देण्याची गरज आहे",
    "sector_15_noida": "सेक्टर 15, नोएडा", "today_10am": "सकाळी 10:00 • आज", "electrical_wiring": "इलेक्ट्रिकल वायरिंग",
    "verma_apartment": "वर्मा अपार्टमेंट", "ceiling_fan_desc": "नवीन सीलिंग फॅन बसवा आणि स्विच बोर्ड बदला",
    "indirapuram_ghaziabad": "इंदिरापुरम, गाझियाबाद", "today_2pm": "दुपारी 2:00 • आज", "plumbing_category": "प्लंबिंग",
    "electrical_category": "इलेक्ट्रिकल", "roof_repair": "छत दुरुस्ती", "mehta_residence": "मेहता निवास",
    "feb_22": "22 फेब्रुवारी, 2026", "9_am": "सकाळी 9:00", "scheduled": "नियोजित", "garden_maintenance": "बागेची देखभाल",
    "joshi_villa": "जोशी विला", "feb_23": "23 फेब्रुवारी, 2026", "2_pm": "दुपारी 2:00", "kumar_family": "कुमार कुटुंब",
    "excellent_work_desc": "उत्कृष्ट काम! खूप व्यावसायिक आणि काम लवकर पूर्ण केले.", "feb_20": "20 फेब्रुवारी, 2026",
    "feb_19": "19 फेब्रुवारी, 2026", "feb_18": "18 फेब्रुवारी, 2026", "feb_17": "17 फेब्रुवारी, 2026", "rajesh_kumar": "राजेश कुमार",
    "prof_worker": "व्यावसायिक कामगार", "rating_48": "4.8 रेटिंग", "jobs_127": "127 नोकऱ्या", "reviews_98": "98 पुनरावलोकने",
    "ac_service_category": "एसी सेवा", "carpentry_category": "सुतारकाम", "english_lang": "इंग्रजी", "hindi_lang": "हिंदी",
    "tamil_lang": "तमिळ"
}

te_dummy = {
    "pending": "పెండింగ్‌లో ఉంది", "bathroom_plumbing": "బాత్రూమ్ ప్లంబింగ్", "kitchen_renovation": "వంటగది పునరుద్ధరణ",
    "light_fixture_install": "లైట్ ఫిక్చర్ ఇన్‌స్టాలేషన్", "ac_repair": "ఏసీ రిపేర్", "plumbing_repair": "ప్లంబింగ్ రిపేర్",
    "sharma_residence": "శర్మ నివాసం", "sink_leaking_desc": "వంటగది సింక్ లీక్ అవుతోంది, వెంటనే దృష్టి అవసరం",
    "sector_15_noida": "సెక్టర్ 15, నోయిడా", "today_10am": "ఉదయం 10:00 • ఈరోజు", "electrical_wiring": "ఎలక్ట్రికల్ వైరింగ్",
    "verma_apartment": "వర్మ అపార్ట్మెంట్", "ceiling_fan_desc": "కొత్త సీలింగ్ ఫ్యాన్ అమర్చండి, స్విచ్ బోర్డులు మార్చండి",
    "indirapuram_ghaziabad": "ఇందిరాపురం, గజియాబాద్", "today_2pm": "మధ్యాహ్నం 2:00 • ఈరోజు", "plumbing_category": "ప్లంబింగ్",
    "electrical_category": "ఎలక్ట్రికల్", "roof_repair": "పైకప్పు మరమ్మతు", "mehta_residence": "మెహతా నివాసం",
    "feb_22": "ఫిబ్రవరి 22, 2026", "9_am": "ఉదయం 9:00", "scheduled": "షెడ్యూల్ చేయబడింది", "garden_maintenance": "తోట నిర్వహణ",
    "joshi_villa": "జోషి విల్లా", "feb_23": "ఫిబ్రవరి 23, 2026", "2_pm": "మధ్యాహ్నం 2:00", "kumar_family": "కుమార్ కుటుంబం",
    "excellent_work_desc": "అద్భుతమైన పని! చాలా ప్రొఫెషనల్ మరియు పని త్వరగా పూర్తయింది.", "feb_20": "ఫిబ్రవరి 20, 2026",
    "feb_19": "ఫిబ్రవరి 19, 2026", "feb_18": "ఫిబ్రవరి 18, 2026", "feb_17": "ఫిబ్రవరి 17, 2026", "rajesh_kumar": "రాజేష్ కుమార్",
    "prof_worker": "వృత్తిపరమైన కార్మికుడు", "rating_48": "4.8 రేటింగ్", "jobs_127": "127 పనులు", "reviews_98": "98 సమీక్షలు",
    "ac_service_category": "ఏసీ సేవలు", "carpentry_category": "కార్పెంట్రీ", "english_lang": "ఇంగ్లీషు", "hindi_lang": "హిందీ",
    "tamil_lang": "తమిళం"
}

ta_dummy = {
    "pending": "நிலுவையில் உள்ளது", "bathroom_plumbing": "குளியலறை குழாய் வேலை", "kitchen_renovation": "சமையலறை புதுப்பித்தல்",
    "light_fixture_install": "ஒளி பொருத்துதல் அமைப்பு", "ac_repair": "ஏசி பழுதுபார்த்தல்", "plumbing_repair": "குழாய் பழுதுபார்த்தல்",
    "sharma_residence": "சர்மா இல்லம்", "sink_leaking_desc": "சமையலறை மடு கசிகிறது, உடனடியாக கவனம் தேவை",
    "sector_15_noida": "செக்டார் 15, நொய்டா", "today_10am": "காலை 10:00 • இன்று", "electrical_wiring": "மின் வயரிங்",
    "verma_apartment": "வர்மா குடியிருப்பு", "ceiling_fan_desc": "புதிய சீலிங் ஃபேன் பொருத்தி சுவிட்ச் போர்டுகளை மாற்றவும்",
    "indirapuram_ghaziabad": "இந்திராபுரம், காசியாபாத்", "today_2pm": "பிற்பகல் 2:00 • இன்று", "plumbing_category": "குழாய் வேலை",
    "electrical_category": "மின்சாரம்", "roof_repair": "கூரையை பழுதுபார்த்தல்", "mehta_residence": "மேத்தா இல்லம்",
    "feb_22": "பிப் 22, 2026", "9_am": "காலை 9:00", "scheduled": "திட்டமிடப்பட்டுள்ளது", "garden_maintenance": "தோட்டப் பராமரிப்பு",
    "joshi_villa": "ஜோஷி வில்லா", "feb_23": "பிப் 23, 2026", "2_pm": "பிற்பகல் 2:00", "kumar_family": "குமார் குடும்பம்",
    "excellent_work_desc": "சிறப்பான வேலை! மிகவும் தொழில்முறை மற்றும் பணியை விரைவாக முடித்தார்.", "feb_20": "பிப் 20, 2026",
    "feb_19": "பிப் 19, 2026", "feb_18": "பிப் 18, 2026", "feb_17": "பிப் 17, 2026", "rajesh_kumar": "ராஜேஷ் குமார்",
    "prof_worker": "தொழில்முறை தொழிலாளி", "rating_48": "4.8 மதிப்பீடு", "jobs_127": "127 வேலைகள்", "reviews_98": "98 மதிப்பாய்வுகள்",
    "ac_service_category": "ஏசி சேவை", "carpentry_category": "தச்சு வேலை", "english_lang": "ஆங்கிலம்", "hindi_lang": "இந்தி",
    "tamil_lang": "தமிழ்"
}

bn_dummy = {
    "pending": "অপেক্ষমান", "bathroom_plumbing": "বাথরুম প্লাম্বিং", "kitchen_renovation": "রান্নাঘর সংস্কার",
    "light_fixture_install": "লাইট ফিক্সচার ইনস্টলেশন", "ac_repair": "এসি মেরামত", "plumbing_repair": "প্লাম্বিং মেরামত",
    "sharma_residence": "শর্মা বাসভবন", "sink_leaking_desc": "রান্নাঘরের সিঙ্ক লিক করছে, অবিলম্বে মনোযোগ প্রয়োজন",
    "sector_15_noida": "সেক্টর ১৫, নয়ডা", "today_10am": "সকাল ১০:০০ • আজ", "electrical_wiring": "বৈদ্যুতিক ওয়্যারিং",
    "verma_apartment": "ভার্মা অ্যাপার্টমেন্ট", "ceiling_fan_desc": "নতুন সিলিং ফ্যান ইনস্টল এবং সুইচ বোর্ড পরিবর্তন করুন",
    "indirapuram_ghaziabad": "ইন্দিরাপুরম, গাজিয়াবাদ", "today_2pm": "দুপুর ২:০০ • আজ", "plumbing_category": "প্লাম্বিং",
    "electrical_category": "বৈদ্যুতিক", "roof_repair": "ছাদ মেরামত", "mehta_residence": "মেহতা বাসভবন",
    "feb_22": "২২ ফেব্রুয়ারি, ২০২৬", "9_am": "সকাল ৯:০০", "scheduled": "নির্ধারিত", "garden_maintenance": "বাগান রক্ষণাবেক্ষণ",
    "joshi_villa": "যোশি ভিলা", "feb_23": "২৩ ফেব্রুয়ারি, ২০২৬", "2_pm": "দুপুর ২:০০", "kumar_family": "কুমার পরিবার",
    "excellent_work_desc": "চমৎকার কাজ! খুব পেশাদার এবং কাজ দ্রুত শেষ করেছে।", "feb_20": "২০ ফেব্রুয়ারি, ২০২৬",
    "feb_19": "১৯ ফেব্রুয়ারি, ২০২৬", "feb_18": "১৮ ফেব্রুয়ারি, ২০২৬", "feb_17": "১৭ ফেব্রুয়ারি, ২০২৬", "rajesh_kumar": "রাজেশ কুমার",
    "prof_worker": "পেশাদার কর্মী", "rating_48": "৪.৮ রেটিং", "jobs_127": "১২৭ কাজ", "reviews_98": "৯৮ রিভিউ",
    "ac_service_category": "এসি পরিষেবা", "carpentry_category": "কাঠের কাজ", "english_lang": "ইংরেজি", "hindi_lang": "হিন্দি",
    "tamil_lang": "তামিল"
}

gu_dummy = {
    "pending": "બાકી", "bathroom_plumbing": "બાથરૂમ પ્લમ્બિંગ", "kitchen_renovation": "રસોડું નવીનીકરણ",
    "light_fixture_install": "લાઇટ ફિક્સર ઇન્સ્ટોલેશન", "ac_repair": "એસી રિપેર", "plumbing_repair": "પ્લમ્બિંગ રિપેર",
    "sharma_residence": "શર્મા નિવાસસ્થાન", "sink_leaking_desc": "રસોડામાં સિંક લીક થઈ રહ્યું છે, તાત્કાલિક ધ્યાન આપવાની જરૂર છે",
    "sector_15_noida": "સેક્ટર 15, નોઈડા", "today_10am": "સવારે 10:00 • આજે", "electrical_wiring": "ઇલેક્ટ્રિકલ વાયરિંગ",
    "verma_apartment": "વર્મા એપાર્ટમેન્ટ", "ceiling_fan_desc": "નવો સીલિંગ ફેન ઇન્સ્ટોલ કરો અને સ્વિચ બોર્ડ બદલો",
    "indirapuram_ghaziabad": "ઇન્દિરાપુરમ, ગાઝિયાબાદ", "today_2pm": "બપોરે 2:00 • આજે", "plumbing_category": "પ્લમ્બિંગ",
    "electrical_category": "ઇલેક્ટ્રિકલ", "roof_repair": "છત રિપેર", "mehta_residence": "મહેતા નિવાસ",
    "feb_22": "22 ફેબ્રુઆરી, 2026", "9_am": "સવારે 9:00", "scheduled": "નિર્ધારિત", "garden_maintenance": "બગીચાની જાળવણી",
    "joshi_villa": "જોશી વિલા", "feb_23": "23 ફેબ્રુઆરી, 2026", "2_pm": "બપોરે 2:00", "kumar_family": "કુમાર પરિવાર",
    "excellent_work_desc": "ઉત્તમ કામ! ખૂબ વ્યવસાયિક અને કાર્ય ઝડપથી પૂર્ણ કર્યું.", "feb_20": "20 ફેબ્રુઆરી, 2026",
    "feb_19": "19 ફેબ્રુઆરી, 2026", "feb_18": "18 ફેબ્રુઆરી, 2026", "feb_17": "17 ફેબ્રુઆરી, 2026", "rajesh_kumar": "રાજેશ કુમાર",
    "prof_worker": "વ્યવસાયિક કામદાર", "rating_48": "4.8 રેટિંગ", "jobs_127": "127 નોકરીઓ", "reviews_98": "98 સમીક્ષાઓ",
    "ac_service_category": "એસી સેવા", "carpentry_category": "સુથારીકામ", "english_lang": "અંગ્રેજી", "hindi_lang": "હિન્દી",
    "tamil_lang": "તમિલ"
}

kn_dummy = {
    "pending": "ಬಾಕಿ ಇದೆ", "bathroom_plumbing": "ಬಾತ್ರೂಮ್ ಪ್ಲಂಬಿಂಗ್", "kitchen_renovation": "ಅಡಿಗೆಮನೆ ನವೀಕರಣ",
    "light_fixture_install": "ಲೈಟ್ ಫಿಕ್ಚರ್ ಅಳವಡಿಕೆ", "ac_repair": "ಎಸಿ ರಿಪೇರಿ", "plumbing_repair": "ಪ್ಲಂಬಿಂಗ್ ರಿಪೇರಿ",
    "sharma_residence": "ಶರ್ಮಾ ನಿವಾಸ", "sink_leaking_desc": "ಅಡಿಗೆಮನೆ ಸಿಂಕ್ ಸೋರುತ್ತಿದೆ, ತಕ್ಷಣ ಗಮನ ಹರಿಸಬೇಕಾಗಿದೆ",
    "sector_15_noida": "ಸೆಕ್ಟರ್ 15, ನೋಯ್ಡಾ", "today_10am": "ಬೆಳಿಗ್ಗೆ 10:00 • ಇಂದು", "electrical_wiring": "ವಿದ್ಯುತ್ ವೈರಿಂಗ್",
    "verma_apartment": "ವರ್ಮಾ ಅಪಾರ್ಟ್ಮೆಂಟ್", "ceiling_fan_desc": "ಹೊಸ ಸೀಲಿಂಗ್ ಫ್ಯಾನ್ ಅಳವಡಿಸಿ ಮತ್ತು ಸ್ವಿಚ್ ಬೋರ್ಡ್‌ಗಳನ್ನು ಬದಲಾಯಿಸಿ",
    "indirapuram_ghaziabad": "ಇಂದಿರಾಪುರಂ, ಗಾಜಿಯಾಬಾದ್", "today_2pm": "ಮಧ್ಯಾಹ್ನ 2:00 • ಇಂದು", "plumbing_category": "ಪ್ಲಂಬಿಂಗ್",
    "electrical_category": "ಎಲೆಕ್ಟ್ರಿಕಲ್", "roof_repair": "ಛಾವಣಿ ದುರಸ್ತಿ", "mehta_residence": "ಮೆಹ್ತಾ ನಿವಾಸ",
    "feb_22": "ಫೆಬ್ರವರಿ 22, 2026", "9_am": "ಬೆಳಿಗ್ಗೆ 9:00", "scheduled": "ನಿಗದಿತ", "garden_maintenance": "ಉದ್ಯಾನ ನಿರ್ವಹಣೆ",
    "joshi_villa": "ಜೋಶಿ ವಿಲ್ಲಾ", "feb_23": "ಫೆಬ್ರವರಿ 23, 2026", "2_pm": "ಮಧ್ಯಾಹ್ನ 2:00", "kumar_family": "ಕುಮಾರ್ ಕುಟುಂಬ",
    "excellent_work_desc": "ಉತ್ತಮ ಕೆಲಸ! ತುಂಬಾ ವೃತ್ತಿಪರ ಮತ್ತು ಕೆಲಸವನ್ನು ತ್ವರಿತವಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದಾರೆ.", "feb_20": "ಫೆಬ್ರವರಿ 20, 2026",
    "feb_19": "ಫೆಬ್ರವರಿ 19, 2026", "feb_18": "ಫೆಬ್ರವರಿ 18, 2026", "feb_17": "ಫೆಬ್ರವರಿ 17, 2026", "rajesh_kumar": "ರಾಜೇಶ್ ಕುಮಾರ್",
    "prof_worker": "ವೃತ್ತಿಪರ ಕೆಲಸಗಾರ", "rating_48": "4.8 ರೇಟಿಂಗ್", "jobs_127": "127 ಕೆಲಸಗಳು", "reviews_98": "98 ವಿಮರ್ಶೆಗಳು",
    "ac_service_category": "ಎಸಿ ಸೇವೆ", "carpentry_category": "ಬಡಗಿ", "english_lang": "ಇಂಗ್ಲಿಷ್", "hindi_lang": "ಹಿಂದಿ",
    "tamil_lang": "ತಮಿಳು"
}

ml_dummy = {
    "pending": "തീർപ്പുകൽപ്പിച്ചിട്ടില്ല", "bathroom_plumbing": "ബാത്ത്റൂം പ്ലംബിംഗ്", "kitchen_renovation": "അടുക്കള നവീകരണം",
    "light_fixture_install": "ലൈറ്റ് ഫിക്ചർ ഇൻസ്റ്റാളേഷൻ", "ac_repair": "എസി അറ്റകുറ്റപ്പണി", "plumbing_repair": "പ്ലംബിംഗ് അറ്റകുറ്റപ്പണി",
    "sharma_residence": "ശർമ്മ വസതി", "sink_leaking_desc": "അടുക്കള സിങ്ക് ചോരുന്നു, അടിയന്തര ശ്രദ്ധ ആവശ്യമാണ്",
    "sector_15_noida": "സെക്ടർ 15, നോയിഡ", "today_10am": "രാവിലെ 10:00 • ഇന്ന്", "electrical_wiring": "ഇലക്‌ട്രിക്കൽ വയറിംഗ്",
    "verma_apartment": "വർമ്മ അപ്പാർട്ട്മെന്റ്", "ceiling_fan_desc": "പുതിയ സീലിംഗ് ഫാൻ ഇൻസ്റ്റാൾ ചെയ്ത് സ്വിച്ച് ബോർഡുകൾ മാറ്റുക",
    "indirapuram_ghaziabad": "ഇന്ദിരാപുരം, ഗാസിയാബാദ്", "today_2pm": "ഉച്ചയ്ക്ക് 2:00 • ഇന്ന്", "plumbing_category": "പ്ലംബിംഗ്",
    "electrical_category": "ഇലക്ട്രിക്കൽ", "roof_repair": "മേൽക്കൂര അറ്റകുറ്റപ്പണി", "mehta_residence": "മേത്ത വസതി",
    "feb_22": "ഫെബ്രുവരി 22, 2026", "9_am": "രാവിലെ 9:00", "scheduled": "ഷെഡ്യൂൾ ചെയ്തു", "garden_maintenance": "പൂന്തോട്ട പരിപാലനം",
    "joshi_villa": "ജോഷി വില്ല", "feb_23": "ഫെബ്രുവരി 23, 2026", "2_pm": "ഉച്ചയ്ക്ക് 2:00", "kumar_family": "കുമാർ കുടുംബം",
    "excellent_work_desc": "മികച്ച ജോലി! വളരെ പ്രൊഫഷണലാണ്, ജോലി വേഗത്തിൽ പൂർത്തിയാക്കി.", "feb_20": "ഫെബ്രുവരി 20, 2026",
    "feb_19": "ഫെബ്രുവരി 19, 2026", "feb_18": "ഫെബ്രുവരി 18, 2026", "feb_17": "ഫെബ്രുവരി 17, 2026", "rajesh_kumar": "രാജേഷ് കുമാർ",
    "prof_worker": "പ്രൊഫഷണൽ തൊഴിലാളി", "rating_48": "4.8 റേറ്റിംഗ്", "jobs_127": "127 ജോലികൾ", "reviews_98": "98 അവലോകനങ്ങൾ",
    "ac_service_category": "എസി സേവനം", "carpentry_category": "ആശാരിപ്പണി", "english_lang": "ഇംഗ്ലീഷ്", "hindi_lang": "ഹിന്ദി",
    "tamil_lang": "തമിഴ്"
}

with open(r"d:\LOC 8.0\Unisquad_LOC8W1\Unisquad_LOC8W1_Final\frontend\src\utils\translations.js", "r", encoding="utf-8") as f:
    text = f.read()

json_str = text.split("export const translations = ")[1].split(";\n")[0]
langs = json.loads(json_str)

langs["en"].update(en_dummy)
langs["hi"].update(hi_dummy)
langs["mr"].update(mr_dummy)
langs["te"].update(te_dummy)
langs["ta"].update(ta_dummy)
langs["bn"].update(bn_dummy)
langs["gu"].update(gu_dummy)
langs["kn"].update(kn_dummy)
langs["ml"].update(ml_dummy)

output = "export const translations = " + json.dumps(langs, indent=2, ensure_ascii=False) + ";\n"
output += "\n// TODO: Replace with backend-driven translation service if required\n"

with open(r"d:\LOC 8.0\Unisquad_LOC8W1\Unisquad_LOC8W1_Final\frontend\src\utils\translations.js", "w", encoding="utf-8") as f:
    f.write(output)
