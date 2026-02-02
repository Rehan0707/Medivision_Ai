"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi" | "mr" | "ta";

const translations = {
    en: {
        dashboard: "Dashboard",
        history: "History",
        labReports: "Lab Reports",
        copilot: "Co-Pilot",
        rehab: "Rehab Center",
        visualizer: "3D Visualizer",
        ruralMode: "Rural Mode",
        privacyMode: "Privacy Mode",
        liveConsult: "Live Consult",
        diagnosing: "Consulting AI...",
        analysisComplete: "Analysis Complete",
        uploadScan: "Upload Scan",
        recoveryRoadmap: "Recovery Roadmap",
        signals: "Signal Intel",
        settings: "Settings",
        trends: "Health Trends",
        predictiveInsights: "Predictive Insights",
    },
    hi: {
        dashboard: "डैशबोर्ड",
        history: "इतिहास",
        labReports: "लैब रिपोर्ट",
        copilot: "को-पायलट",
        rehab: "पुनर्वास केंद्र",
        visualizer: "3D विज़ुअलाइज़र",
        ruralMode: "ग्रामीण मोड",
        privacyMode: "गोपनीयता मोड",
        liveConsult: "लाइव परामर्श",
        diagnosing: "एआई परामर्श कर रहा है...",
        analysisComplete: "विश्लेषण पूर्ण",
        uploadScan: "स्कैन अपलोड करें",
        recoveryRoadmap: "रिकवरी रोडमैप",
        signals: "सिग्नल इंटेलिजेंस",
        settings: "सेटिंग्स",
        trends: "स्वास्थ्य रुझान",
        predictiveInsights: "भविष्य कहनेवाला अंतर्दृष्टि",
    },
    mr: {
        dashboard: "डॅशबोर्ड",
        history: "इतिहास",
        labReports: "लॅब रिपोर्ट",
        copilot: "को-पायलट",
        rehab: "पुनर्वसन केंद्र",
        visualizer: "3D व्हिज्युअलायझर",
        ruralMode: "ग्रामीण मोड",
        privacyMode: "गोपनीयता मोड",
        liveConsult: "थेट सल्ला",
        diagnosing: "एआय सल्ला घेत आहे...",
        analysisComplete: "विश्लेषण पूर्ण झाले",
        uploadScan: "स्कॅन अपलोड करा",
        recoveryRoadmap: "रिकव्हरी रोडमॅप",
        signals: "सिग्नल इंटेलिजन्स",
        settings: "सेटिंग्ज",
        trends: "आरोग्य कल",
        predictiveInsights: "भविष्यवाणी अंतर्दृष्टी",
    },
    ta: {
        dashboard: "டாஷ்போர்டு",
        history: "வரலாறு",
        labReports: "ஆய்வக அறிக்கைகள்",
        copilot: "கோ-பைலட்",
        rehab: "மறுவாழ்வு மையம்",
        visualizer: "3D விஸ்வலைசர்",
        ruralMode: "கிராமப்புற பயன்முறை",
        privacyMode: "தனியுரிமை முறை",
        liveConsult: "நேரடி ஆலோசனை",
        diagnosing: "AI ஆலோசனை செய்கிறது...",
        analysisComplete: "பகுப்பாய்வு முடிந்தது",
        uploadScan: "ஸ்கேன் பதிவேற்றவும்",
        recoveryRoadmap: "மீட்பு சாலை வரைபடம்",
        signals: "சிக்னல் இன்டெல்",
        settings: "அமைப்புகள்",
        trends: "சுகாதார போக்குகள்",
        predictiveInsights: "முன்கணிப்பு நுண்ணறிவு",
    }
};

interface SettingsContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    isRuralMode: boolean;
    setIsRuralMode: (val: boolean) => void;
    isPrivacyMode: boolean;
    setIsPrivacyMode: (val: boolean) => void;
    t: (key: keyof typeof translations.en) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");
    const [isRuralMode, setIsRuralMode] = useState(false);
    const [isPrivacyMode, setIsPrivacyMode] = useState(false);

    const t = (key: keyof typeof translations.en) => {
        return translations[language][key] || translations.en[key];
    };

    // Apply global classes for Rural Mode and Privacy Mode
    useEffect(() => {
        if (isRuralMode) {
            document.documentElement.classList.add("rural-mode");
        } else {
            document.documentElement.classList.remove("rural-mode");
        }
    }, [isRuralMode]);

    useEffect(() => {
        if (isPrivacyMode) {
            document.documentElement.classList.add("privacy-mode");
        } else {
            document.documentElement.classList.remove("privacy-mode");
        }
    }, [isPrivacyMode]);

    return (
        <SettingsContext.Provider
            value={{
                language,
                setLanguage,
                isRuralMode,
                setIsRuralMode,
                isPrivacyMode,
                setIsPrivacyMode,
                t
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
