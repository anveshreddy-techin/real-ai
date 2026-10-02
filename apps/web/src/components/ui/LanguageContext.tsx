'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'hi' | 'bn' | 'mr' | 'te' | 'ta';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeName: string;
  symbol: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English', symbol: 'EN' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', symbol: 'हिं' },
  { code: 'bn', label: 'Bengali', nativeName: 'বাংলা', symbol: 'বাং' },
  { code: 'mr', label: 'Marathi', nativeName: 'मराठी', symbol: 'म' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు', symbol: 'తె' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்', symbol: 'த' },
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    app_title: 'SkillGuard AI',
    app_subtitle: 'Real-Time Centre Monitoring System',
    command_center: 'Command Center',
    live_studio: 'Live Video Studio',
    centres: 'Centres',
    attendance_audit: 'Attendance Audit',
    infra_bom: 'Infrastructure (BOM)',
    alerts: 'Discrepancy Alerts',
    why_skillguard: 'Why SkillGuard (Uniqueness)',
    datasets_hub: 'Real Datasets Hub',
    pipeline_benchmarks: 'AI Pipeline & Benchmarks',
    privacy_note: 'Privacy Note',
    government_india: 'Government of India • Ministry of Skill Development and Entrepreneurship (MSDE)',
    live_telemetry: 'Live AI Edge Telemetry',
    male: 'Male',
    female: 'Female',
    trainer: 'Trainer',
    present: 'Present',
    absent_ghost: 'Ghost / Absent',
    biometric_submitted: 'Official AEBAS Registered',
    camera_detected: 'Camera Physical Count',
    verified_match: 'Verified Match',
    ghost_discrepancy: 'Ghost Discrepancy',
    launch_studio: 'Launch Live Video Studio',
    easy_guide_title: 'Easy Guide for Students & Visitors:',
    easy_guide_desc: 'Green check (✅) means trainee is sitting in class learning. Red cross (❌) means trainee registered attendance at the door but left the room.',
    select_language: 'Select Language',
    download_notice: 'Download Form 4A Notice',
    issue_notice: 'Issue Formal Notice',
    dispatch_team: 'Dispatch Audit Team',
  },
  hi: {
    app_title: 'स्किलगार्ड AI',
    app_subtitle: 'प्रशिक्षण केंद्र वास्तविक समय निगरानी प्रणाली',
    command_center: 'मुख्य कमांड केंद्र',
    live_studio: 'लाइव वीडियो स्टूडियो',
    centres: 'प्रशिक्षण केंद्र',
    attendance_audit: 'उपस्थिति ऑडिट',
    infra_bom: 'उपकरण एवं संरचना (BOM)',
    alerts: 'गड़बड़ी अलर्ट',
    why_skillguard: 'स्किलगार्ड की विशेषताएँ',
    datasets_hub: 'वास्तविक डेटासेट हब',
    pipeline_benchmarks: 'AI मॉडल एवं बेंचमार्क',
    privacy_note: 'गोपनीयता नियम (DPDP)',
    government_india: 'भारत सरकार • कौशल विकास एवं उद्यमशीलता मंत्रालय (MSDE)',
    live_telemetry: 'सजीव AI एज टेलीमेट्री',
    male: 'पुरुष',
    female: 'महिला',
    trainer: 'प्रशिक्षक',
    present: 'कक्षा में उपस्थित',
    absent_ghost: 'गायब / फ़र्ज़ी',
    biometric_submitted: 'बायोमेट्रिक में दर्ज़',
    camera_detected: 'कैमरे द्वारा गिनती',
    verified_match: 'सत्यापित उपस्थिति',
    ghost_discrepancy: 'फ़र्ज़ी उपस्थिति गड़बड़ी',
    launch_studio: 'लाइव वीडियो स्टूडियो खोलें',
    easy_guide_title: 'छात्रों और आगंतुकों के लिए सरल गाइड:',
    easy_guide_desc: 'हरा निशान (✅) का मतलब है कि छात्र क्लास में मौजूद हैं। लाल निशान (❌) का मतलब है कि हाज़िरी लगी है लेकिन छात्र क्लास से गायब हैं।',
    select_language: 'भाषा चुनें',
    download_notice: 'फॉर्म 4A नोटिस डाउनलोड करें',
    issue_notice: 'कारण बताओ नोटिस जारी करें',
    dispatch_team: 'जाँच टीम रवाना करें',
  },
  bn: {
    app_title: 'স্কিলগার্ড এআই',
    app_subtitle: 'প্রশিক্ষণ কেন্দ্র রিয়েল-টাইম মনিটরিং সিস্টেম',
    command_center: 'কমান্ড সেন্টার',
    live_studio: 'লাইভ ভিডিও স্টুডিও',
    centres: 'প্রশিক্ষণ কেন্দ্রসমূহ',
    attendance_audit: 'উপস্থিতি অডিট',
    infra_bom: 'যন্ত্রপাতি ও পরিকাঠামো (BOM)',
    alerts: 'অসঙ্গতি সতর্কতা',
    why_skillguard: 'কেন স্কিলগার্ড অনন্য',
    datasets_hub: 'আসল ডেটাসেট হাব',
    pipeline_benchmarks: 'এআই পাইপলাইন ও বেঞ্চমার্ক',
    privacy_note: 'গোপনীয়তা নীতি (DPDP)',
    government_india: 'ভারত সরকার • দক্ষতা উন্নয়ন ও উদ্যোক্তা মন্ত্রক (MSDE)',
    live_telemetry: 'লাইভ এআই এজ টেলিমেট্রি',
    male: 'পুরুষ',
    female: 'মহিলা',
    trainer: 'প্রশিক্ষক',
    present: 'উপস্থিত',
    absent_ghost: 'অনুপস্থিত / ভুয়া',
    biometric_submitted: 'বায়োমেট্রিক নিবন্ধিত',
    camera_detected: 'ক্যামেরা সনাক্তকৃত সংখ্যা',
    verified_match: 'যাচাইকৃত মিল',
    ghost_discrepancy: 'ভুয়া উপস্থিতি অসঙ্গতি',
    launch_studio: 'লাইভ ভিডিও স্টুডিও খুলুন',
    easy_guide_title: 'সহজ নির্দেশিকা:',
    easy_guide_desc: 'সবুজ চিহ্ন (✅) মানে শিক্ষার্থী ক্লাসে উপস্থিত। লাল চিহ্ন (❌) মানে বায়োমেট্রিক পাঞ্চের পর শিক্ষার্থী অনুপস্থিত।',
    select_language: 'ভাষা নির্বাচন করুন',
    download_notice: 'ফর্ম 4A নোটিশ ডাউনলোড করুন',
    issue_notice: 'আনুষ্ঠানিক নোটিশ জারি করুন',
    dispatch_team: 'অডিট দল পাঠান',
  },
  mr: {
    app_title: 'स्किलगार्ड AI',
    app_subtitle: 'प्रशिक्षण केंद्र थेट देखरेख प्रणाली',
    command_center: 'कमांड सेंटर',
    live_studio: 'थेट व्हिडिओ स्टुडिओ',
    centres: 'प्रशिक्षण केंद्रे',
    attendance_audit: 'हजेरी तपासणी',
    infra_bom: 'उपकरणे आणि पायाभूत सुविधा (BOM)',
    alerts: 'तफावत सूचना',
    why_skillguard: 'स्किलगार्ड का वेगळे आहे',
    datasets_hub: 'वास्तविक डेटासेट केंद्र',
    pipeline_benchmarks: 'AI पाइपलाइन व बेंचमार्क',
    privacy_note: 'गोपनीयता नियम (DPDP)',
    government_india: 'भारत सरकार • कौशल्य विकास आणि उद्योजकता मंत्रालय (MSDE)',
    live_telemetry: 'थेट AI एज टेलिमेट्री',
    male: 'पुरुष',
    female: 'महिला',
    trainer: 'प्रशिक्षक',
    present: 'हजर',
    absent_ghost: 'गैरहजर / बोगस',
    biometric_submitted: 'बायोमेट्रिक नोंदणीकृत',
    camera_detected: 'कॅमेऱ्याने मोजलेली संख्या',
    verified_match: 'सत्यापित जुळणी',
    ghost_discrepancy: 'बोगस हजेरी तफावत',
    launch_studio: 'थेट व्हिडिओ स्टुडिओ उघडा',
    easy_guide_title: 'सोपे मार्गदर्शक:',
    easy_guide_desc: 'हिरवे चिन्ह (✅) म्हणजे विद्यार्थी वर्गात शिकत आहेत. लाल चिन्ह (❌) म्हणजे हजेरी लावून विद्यार्थी गायब आहेत.',
    select_language: 'भाषा निवडा',
    download_notice: 'फॉर्म 4A नोटीस डाउनलोड करा',
    issue_notice: 'कारणे दाखवा नोटीस द्या',
    dispatch_team: 'तपासणी पथक पाठवा',
  },
  te: {
    app_title: 'స్కిల్‌గార్డ్ AI',
    app_subtitle: 'శిక్షణ కేంద్రాల రియల్-టైమ్ పర్యవేక్షణ వ్యవస్థ',
    command_center: 'కమాండ్ సెంటర్',
    live_studio: 'లైవ్ వీడియో స్టూడియో',
    centres: 'శిక్షణ కేంద్రాలు',
    attendance_audit: 'హాజరు ఆడిట్',
    infra_bom: 'పరికరాలు & మౌలిక వసతులు (BOM)',
    alerts: 'వ్యత్యాస హెచ్చరికలు',
    why_skillguard: 'స్కిల్‌గార్డ్ ఎందుకు ప్రత్యేకం',
    datasets_hub: 'రియల్ డేటాసెట్ల హబ్',
    pipeline_benchmarks: 'AI పైప్‌లైన్ & బెంచ్‌మార్కులు',
    privacy_note: 'గోప్యతా నియమాలు (DPDP)',
    government_india: 'భారత ప్రభుత్వం • నైపుణ్యాభివృద్ధి & వ్యవస్థాపకత మంత్రిత్వ శాఖ (MSDE)',
    live_telemetry: 'లైవ్ AI ఎడ్జ్ టెలిమెట్రీ',
    male: 'పురుషులు',
    female: 'మహిళలు',
    trainer: 'ట్రైనర్ / శిక్షకుడు',
    present: 'హాజరయ్యారు',
    absent_ghost: 'గైర్హాజరు / బోగస్',
    biometric_submitted: 'బయోమెట్రిక్ నమోదు',
    camera_detected: 'కెమెరా గుర్తించిన సంఖ్య',
    verified_match: 'ధృవీకరించబడిన హాజరు',
    ghost_discrepancy: 'బోగస్ హాజరు వ్యత్యాసం',
    launch_studio: 'లైవ్ వీడియో స్టూడియో ప్రారంభించండి',
    easy_guide_title: 'సులభమైన గైడ్:',
    easy_guide_desc: 'ఆకుపచ్చ గుర్తు (✅) అంటే విద్యార్థి క్లాస్‌లో ఉన్నారు. ఎరుపు గుర్తు (❌) అంటే బయోమెట్రిక్ వేసి క్లాస్ నుండి వెళ్లిపోయారు.',
    select_language: 'భాషను ఎంచుకోండి',
    download_notice: 'ఫారమ్ 4A నోటీసు డౌన్‌లోడ్ చేయండి',
    issue_notice: 'షో-కాజ్ నోటీసు జారీ చేయండి',
    dispatch_team: 'తనిఖీ బృందాన్ని పంపండి',
  },
  ta: {
    app_title: 'ஸ்கில்கார்ட் AI',
    app_subtitle: 'பயிற்சி மையங்கள் நேரடி கண்காணிப்பு அமைப்பு',
    command_center: 'கட்டளை மையம்',
    live_studio: 'நேரலை வீடியோ ஸ்டுடியோ',
    centres: 'பயிற்சி மையங்கள்',
    attendance_audit: 'வருகை தணிக்கை',
    infra_bom: 'உபகரணங்கள் மற்றும் கட்டமைப்பு (BOM)',
    alerts: 'முரண்பாடு எச்சரிக்கைகள்',
    why_skillguard: 'ஸ்கில்கார்ட் ஏன் தனித்துவமானது',
    datasets_hub: 'உண்மையான தரவுத்தொகுப்பு மையம்',
    pipeline_benchmarks: 'AI பைப்லைன் மற்றும் மதிப்பீடுகள்',
    privacy_note: 'தனியுரிமை குறிப்பு (DPDP)',
    government_india: 'இந்திய அரசு • திறன் மேம்பாடு மற்றும் தொழில்முனைவோர் அமைச்சகம் (MSDE)',
    live_telemetry: 'நேரடி AI விளிம்பு தொலை அளவியல்',
    male: 'ஆண்கள்',
    female: 'பெண்கள்',
    trainer: 'பயிற்றுவிப்பாளர்',
    present: 'வருகை தந்துள்ளார்',
    absent_ghost: 'வருகை தரவில்லை / போலி',
    biometric_submitted: 'பயோமெட்ரிக் பதிவு',
    camera_detected: 'கேமரா மூலம் கண்டறியப்பட்ட எண்ணிக்கை',
    verified_match: 'சரிபார்க்கப்பட்ட பொருத்தம்',
    ghost_discrepancy: 'போலி வருகை முரண்பாடு',
    launch_studio: 'நேரலை வீடியோ ஸ்டுடியோவை திறக்கவும்',
    easy_guide_title: 'எளிய வழிகாட்டி:',
    easy_guide_desc: 'பச்சை குறி (✅) மாணவர் வகுப்பில் உள்ளார் என்பதை குறிக்கிறது. சிவப்பு குறி (❌) மாணவர் பயோமெட்ரிக் வைத்துவிட்டு வகுப்பிற்கு வரவில்லை என்பதை குறிக்கிறது.',
    select_language: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    download_notice: 'படிவம் 4A அறிவிப்பைப் பதிவிறக்கவும்',
    issue_notice: 'காரணம் கேட்கும் அறிவிப்பு வெளியிடவும்',
    dispatch_team: 'தணிக்கைக் குழுவை அனுப்பவும்',
  }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('skillguard_lang') as LanguageCode;
      if (saved && TRANSLATIONS[saved]) {
        setLanguageState(saved);
      }
    } catch {
      // ignore SSR or restricted localStorage
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('skillguard_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
