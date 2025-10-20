// translations.js - Language translations for Viral Guard
const translations = {
    vi: {
        // Menu Screen
        gameTitle: "VIRAL GUARD",
        tagline: "Bảo vệ cộng đồng khỏi tin giả",
        subtitle: "Game nhập vai - Hidden Role Social Deduction",
        aboutGame: "🎭 Về Game",
        objective: "Mục tiêu:",
        objectiveText: "Giữ <strong>Đồng hồ Lan truyền</strong> (Viral Meter) dưới ngưỡng nguy hiểm!",
        warning: "Cảnh báo:",
        warningText: "Có 1 người là <strong>Giật Tít</strong> (traitor) đang cố phá game!",
        timeInfo: "Thời gian:",
        timeText: "10-15 phút | <strong>Người chơi:</strong> 3-5 người",
        gameSetup: "⚙️ Thiết lập game",
        numPlayers: "Số người chơi:",
        difficulty: "Độ khó:",
        difficultyEasy: "Dễ",
        difficultyMedium: "Chuẩn",
        difficultyHard: "Khó",
        enableFactChecker: "Bật vai Fact-Checker (khuyến nghị)",
        startButton: "▶️ Bắt đầu Game",
        howToPlayButton: "📖 Cách Chơi",
        credits: "🎓 Made for RMIT Hackathon 2024 | Theme: Digital Safety & Misinformation",
        language: "🌐 Ngôn ngữ:",
        
        // How to Play Screen
        howToPlayTitle: "📖 Cách Chơi Viral Guard",
        playObjective: "🎯 Mục tiêu chơi",
        moderatorRoleCard: "🛡️ Gác Cổng (Moderators)",
        moderatorObjective: "Giữ Viral Meter < ngưỡng sau 6 vòng",
        moderatorMission: "Gắn cờ tin sai, debunk hiệu quả",
        factCheckerRoleCard: "✅ Fact-Checker",
        factCheckerObjective: "Hỗ trợ Gác Cổng thắng",
        factCheckerPower: "3-4 token kiểm chứng, lật nguồn tin",
        clickbaitRoleCard: "🔥 Giật Tít (Traitor)",
        clickbaitObjective: "Đẩy Viral Meter ≥ ngưỡng",
        clickbaitPower: "Bí mật +1 virality, chặn 1 fact-check/game",
        
        roundRules: "🎮 Luật chơi từng vòng",
        step1Title: "Rút thẻ tin:",
        step1Desc: "4 thẻ tin xuất hiện trong feed (ẩn độ tin cậy)",
        step2Title: "Quan sát tín hiệu:",
        step2Desc: "URL lạ? ALL CAPS? Thiếu nguồn? Ảnh mờ?",
        step3Title: "Chọn hành động:",
        step3Desc: "Mỗi người chọn 1 thẻ để:",
        actionShareTitle: "Share:",
        actionShareDesc: "Khuếch tán (+virality, +điểm nếu tin đúng)",
        actionFlagTitle: "Flag:",
        actionFlagDesc: "Gắn cờ (chặn lan truyền vòng này)",
        actionCheckTitle: "Check:",
        actionCheckDesc: "Kiểm chứng (tốn 1 token, lật nguồn)",
        step4Title: "Giải quyết:",
        step4Desc: "Tính toán virality, cập nhật meter",
        step5Title: "Sự kiện:",
        step5Desc: "Lật 1 thẻ sự kiện (Bão tin đồn, KOL chia sẻ...)",
        step6Title: "Kết thúc vòng:",
        step6Desc: "Chuyển sang vòng tiếp theo (tổng 6 vòng)",
        
        signalsTitle: "🚩 6 Tín hiệu nhận biết tin giả",
        signal1Title: "ALL CAPS / Khẩn cấp",
        signal1Desc: "Tạo áp lực, ép click",
        signal2Title: "URL lạ / Rút gọn",
        signal2Desc: "Domain không chính thống",
        signal3Title: "Quá tốt để thật",
        signal3Desc: "Biệt dược kỳ diệu, quà miễn phí",
        signal4Title: "Ảnh cũ tái đăng",
        signal4Desc: "Không ghi mốc thời gian",
        signal5Title: "Thiếu nguồn",
        signal5Desc: "Không nêu nghiên cứu, tác giả",
        signal6Title: "Số liệu phóng đại",
        signal6Desc: "Khái quát hóa, quá lời",
        
        winConditionsTitle: "🏆 Điều kiện thắng/thua",
        goodTeamWin: "Gác Cổng + Fact-Checker thắng:",
        goodTeamWinDesc: "Viral Meter < ngưỡng sau 6 vòng",
        clickbaitWin: "Giật Tít thắng:",
        clickbaitWinDesc: "Viral Meter ≥ ngưỡng bất kỳ lúc nào",
        instantLoss: "Thua tức thì:",
        instantLossDesc: "Viral Meter đạt 20 (bùng phát)",
        startPlayingButton: "Bắt đầu chơi!",
        
        backButton: "← Quay lại",
        objective: "Mục tiêu:",
        mission: "Nhiệm vụ:",
        power: "Quyền năng:",
        abilities: "Kỹ năng:",
        
        // Role Assignment Screen
        roleAssignTitle: "🎭 Phân vai bí mật",
        roleAssignDesc: "Vai trò của bạn đã được chọn ngẫu nhiên. Nhấn để xem (đừng để người khác nhìn!)",
        revealRoleButton: "🎭 Lật thẻ vai trò",
        yourRole: "Vai trò của bạn:",
        roleNameEn: "Tên tiếng Anh:",
        roleDescription: "Mô tả:",
        roleObjective: "Mục tiêu:",
        roleAbilities: "Kỹ năng đặc biệt:",
        startRound1: "🎮 Bắt đầu vòng 1",
        startRound1Button: "Bắt đầu vòng 1 →",
        
        // Play Screen
        round: "Vòng",
        turn: "Lượt:",
        currentTurn: "Lượt:",
        viralMeter: "🔥 Viral Meter",
        trustMeter: "💎 Trust Meter",
        tokens: "Tokens:",
        feedTitle: "📱 Feed tin tức",
        shareBtn: "📢 Share",
        flagBtn: "🚩 Flag",
        checkBtn: "✅ Check",
        playersTitle: "👥 Người chơi",
        activityLog: "� Nhật ký hành động",
        gameStartLog: "Game bắt đầu - Vòng 1",
        instructionsTitle: "💡 Hướng dẫn",
        yourTurnMsg: "Lượt của bạn!",
        selectCardAction: "Chọn 1 thẻ và 1 hành động:",
        shareActionGuide: "Share:",
        shareActionDesc: "+điểm nếu đúng, +virality",
        flagActionGuide: "Flag:",
        flagActionDesc: "Chặn lan truyền",
        checkActionGuide: "Check:",
        checkActionDesc: "Lật nguồn (tốn 1 token)",
        
        // Action Modal
        chooseAction: "Chọn hành động",
        confirm: "Xác nhận",
        cancel: "Hủy",
        selectedCard: "Thẻ đã chọn:",
        actionDescription: "Mô tả hành động:",
        confirmBtn: "✅ Xác nhận",
        cancelBtn: "❌ Hủy",
        
        // Event Modal
        eventTitle: "📢 Sự kiện",
        continue: "Tiếp tục",
        continueBtn: "Tiếp tục",
        
        // Round Summary Modal
        roundEnd: "Kết thúc vòng",
        viralScore: "Viral Meter:",
        trustScore: "Trust Meter:",
        nextRoundButton: "Vòng tiếp theo →",
        nextRoundBtn: "Vòng tiếp theo →",
        
        // Results Screen
        gameResultTitle: "🏆 Kết quả trận đấu",
        gameOver: "🎮 KẾT THÚC GAME",
        teamGoodWins: "🛡️ TEAM TỐT THẮNG!",
        clickbaitWins: "� CLICKBAIT THẮNG!",
        finalScores: "📊 Điểm số cuối cùng",
        finalViralMeter: "Viral Meter cuối",
        finalTrustMeter: "Trust Meter",
        roundsPlayed: "Số vòng đã chơi",
        finalViral: "Viral Meter cuối:",
        finalTrust: "Trust Meter cuối:",
        scoreboard: "📊 Bảng điểm người chơi",
        learningSection: "🎓 Bạn đã học được gì?",
        playerRole: "Vai trò:",
        playerScore: "Điểm:",
        playAgainBtn: "🔄 Chơi lại",
        notification: "Thông báo",
        
        // Card Topics
        topicHealth: "sức khỏe",
        topicClimate: "khí hậu",
        topicEnvironment: "môi trường",
        topicTech: "công nghệ",
        topicScam: "lừa đảo số",
        topicConsumer: "tiêu dùng",
        topicNutrition: "dinh dưỡng",
        topicEnergy: "tiêu dùng",
        
        // Action Messages
        actionShare: "chia sẻ tin",
        actionFlag: "gắn cờ",
        actionCheck: "kiểm chứng",
        actionFlagCorrect: "gắn cờ chính xác!",
        actionFlagWrong: "gắn cờ nhầm",
        actionDebunkSuccess: "debunk thành công!",
        actionCheckTrue: "kiểm chứng tin đúng",
        
        // Game Start
        gameStarting: "Game bắt đầu - Vòng 1",
        
        // Roles
        moderator: "Moderator",
        factChecker: "Fact-Checker",
        clickbait: "Clickbait",
        
        // Card Info
        virality: "🔥",
        credibility: "Độ tin cậy:",
        flagged: "🚩 Đã gắn cờ",
        
        // Game Info
        you: "Bạn",
        ai: "AI",
        
        // Learning Section
        learningSection: "🎓 Bạn đã học được gì?",
        learnRedFlags: "🚩 Dấu hiệu cảnh báo",
        learnMistakes: "❌ Rút kinh nghiệm",
        learnTips: "💡 Mẹo cho lần sau",
        learnQuiz: "🎯 Quiz nhanh (3 câu)",
        learnSubmit: "Nộp bài",
        learnCopy: "📋 Sao chép 5 điều rút ra",
        learnSave: "💾 Lưu vào nhật ký",
        learnCopied: "✅ Đã sao chép!",
        learnSaved: "✅ Đã lưu!",
        learnNoFlags: "Chưa thu thập được dấu hiệu nào",
        learnNoMistakes: "Không có sai lầm - rất tốt!",
        learnSummary: "Ván này bạn xem {n} thẻ, gắn cờ đúng {f} lần và kiểm chứng {c} lần.",
        learnQuizQ: "Thẻ này là TRUE, FALSE, MISLEADING hay SATIRE?",
        learnQuizResult: "Điểm của bạn: ",
        learnSuggestFlag: "Nên gắn cờ",
        learnSuggestShare: "Có thể chia sẻ",
        learnSuggestCheck: "Kiểm chứng trước rồi quyết định",
        learnSuggestSatire: "Đánh dấu châm biếm hoặc bỏ qua",
        learnSuggestDefault: "Xác minh từ nguồn chính thống",
        learnTipMod1: "Gắn cờ sớm các thẻ giả có virality cao",
        learnTipMod2: "Nếu chưa chắc, nhờ Fact-Checker kiểm chứng trước",
        learnTipFC1: "Dùng token cho thẻ có thể xoay chuyển vòng",
        learnTipFC2: "Chia sẻ thẻ đúng để pha loãng virality",
        learnTipCB1: "Chia sẻ thẻ sai/gây hiểu lầm có virality cao",
        learnTipCB2: "Thi thoảng gắn cờ tin giả rõ ràng để ngụy trang"
    },
    
    en: {
        // Menu Screen
        gameTitle: "VIRAL GUARD",
        tagline: "Protect community from misinformation",
        subtitle: "Hidden Role Social Deduction Game",
        aboutGame: "🎭 About Game",
        objective: "Objective:",
        objectiveText: "Keep the <strong>Viral Meter</strong> below dangerous threshold!",
        warning: "Warning:",
        warningText: "There's 1 <strong>Clickbait</strong> (traitor) trying to sabotage the game!",
        timeInfo: "Time:",
        timeText: "10-15 minutes | <strong>Players:</strong> 3-5 people",
        gameSetup: "⚙️ Game Setup",
        numPlayers: "Number of players:",
        difficulty: "Difficulty:",
        difficultyEasy: "Easy",
        difficultyMedium: "Medium",
        difficultyHard: "Hard",
        enableFactChecker: "Enable Fact-Checker role (recommended)",
        startButton: "▶️ Start Game",
        howToPlayButton: "📖 How to Play",
        credits: "🎓 Made for RMIT Hackathon 2024 | Theme: Digital Safety & Misinformation",
        language: "🌐 Language:",
        
        // How to Play Screen
        howToPlayTitle: "📖 How to Play Viral Guard",
        playObjective: "🎯 Game Objective",
        moderatorRoleCard: "🛡️ Gatekeeper (Moderators)",
        moderatorObjective: "Keep Viral Meter < threshold after 6 rounds",
        moderatorMission: "Flag fake news, debunk effectively",
        factCheckerRoleCard: "✅ Fact-Checker",
        factCheckerObjective: "Support Gatekeepers to win",
        factCheckerPower: "3-4 verification tokens, reveal sources",
        clickbaitRoleCard: "🔥 Clickbait (Traitor)",
        clickbaitObjective: "Push Viral Meter ≥ threshold",
        clickbaitPower: "Secret +1 virality, block 1 fact-check/game",
        
        roundRules: "🎮 Round-by-round Rules",
        step1Title: "Draw cards:",
        step1Desc: "4 news cards appear in feed (credibility hidden)",
        step2Title: "Observe signals:",
        step2Desc: "Strange URL? ALL CAPS? Missing source? Blurry image?",
        step3Title: "Choose action:",
        step3Desc: "Each person picks 1 card to:",
        actionShareTitle: "Share:",
        actionShareDesc: "Amplify (+virality, +points if true)",
        actionFlagTitle: "Flag:",
        actionFlagDesc: "Mark fake (blocks spread this round)",
        actionCheckTitle: "Check:",
        actionCheckDesc: "Verify (costs 1 token, reveals source)",
        step4Title: "Resolve:",
        step4Desc: "Calculate virality, update meters",
        step5Title: "Event:",
        step5Desc: "Reveal 1 event card (Rumor Storm, KOL shares...)",
        step6Title: "End round:",
        step6Desc: "Move to next round (total 6 rounds)",
        
        signalsTitle: "🚩 6 Fake News Signals",
        signal1Title: "ALL CAPS / Urgent",
        signal1Desc: "Creates pressure, forces clicks",
        signal2Title: "Strange URL / Shortened",
        signal2Desc: "Non-official domain",
        signal3Title: "Too good to be true",
        signal3Desc: "Miracle cure, free gifts",
        signal4Title: "Old photo reposted",
        signal4Desc: "No timestamp",
        signal5Title: "Missing source",
        signal5Desc: "No research or author cited",
        signal6Title: "Exaggerated data",
        signal6Desc: "Overgeneralized, excessive",
        
        winConditionsTitle: "🏆 Win/Loss Conditions",
        goodTeamWin: "Gatekeepers + Fact-Checker win:",
        goodTeamWinDesc: "Viral Meter < threshold after 6 rounds",
        clickbaitWin: "Clickbait wins:",
        clickbaitWinDesc: "Viral Meter ≥ threshold anytime",
        instantLoss: "Instant loss:",
        instantLossDesc: "Viral Meter reaches 20 (outbreak)",
        startPlayingButton: "Start Playing!",
        
        backButton: "← Back",
        objective: "Objective:",
        mission: "Mission:",
        power: "Power:",
        abilities: "Abilities:",
        
        // Role Assignment Screen
        roleAssignTitle: "🎭 Secret Role Assignment",
        roleAssignDesc: "Your role has been randomly assigned. Click to reveal (don't let others see!)",
        revealRoleButton: "🎭 Reveal Role",
        yourRole: "Your Role:",
        roleNameEn: "English Name:",
        roleDescription: "Description:",
        roleObjective: "Objective:",
        roleAbilities: "Special Abilities:",
        startRound1: "🎮 Start Round 1",
        startRound1Button: "Start Round 1 →",
        
        // Play Screen
        round: "Round",
        turn: "Turn:",
        currentTurn: "Turn:",
        viralMeter: "🔥 Viral Meter",
        trustMeter: "💎 Trust Meter",
        tokens: "Tokens:",
        feedTitle: "📱 News Feed",
        shareBtn: "📢 Share",
        flagBtn: "🚩 Flag",
        checkBtn: "✅ Check",
        playersTitle: "👥 Players",
        activityLog: "� Activity Log",
        gameStartLog: "Game starting - Round 1",
        instructionsTitle: "💡 Instructions",
        yourTurnMsg: "Your turn!",
        selectCardAction: "Choose 1 card and 1 action:",
        shareActionGuide: "Share:",
        shareActionDesc: "+points if correct, +virality",
        flagActionGuide: "Flag:",
        flagActionDesc: "Block spread",
        checkActionGuide: "Check:",
        checkActionDesc: "Reveal source (costs 1 token)",
        
        // Action Modal
        chooseAction: "Choose Action",
        confirm: "Confirm",
        cancel: "Cancel",
        confirmAction: "Confirm Action",
        selectedCard: "Selected Card:",
        actionDescription: "Action Description:",
        confirmBtn: "✅ Confirm",
        cancelBtn: "❌ Cancel",
        
        // Event Modal
        eventTitle: "📢 Event",
        continue: "Continue",
        continueBtn: "Continue",
        
        // Round Summary Modal
        roundEnd: "Round End",
        viralScore: "Viral Meter:",
        trustScore: "Trust Meter:",
        nextRoundButton: "Next Round →",
        nextRoundBtn: "Next Round →",
        
        // Results Screen
        gameResultTitle: "🏆 Match Results",
        gameOver: "🎮 GAME OVER",
        teamGoodWins: "🛡️ GOOD TEAM WINS!",
        clickbaitWins: "� CLICKBAIT WINS!",
        finalScores: "📊 Final Scores",
        finalViralMeter: "Final Viral Meter",
        finalTrustMeter: "Trust Meter",
        roundsPlayed: "Rounds played",
        finalViral: "Final Viral Meter:",
        finalTrust: "Final Trust Meter:",
        scoreboard: "📊 Player Scoreboard",
        learningSection: "🎓 What did you learn?",
        playerRole: "Role:",
        playerScore: "Score:",
        playAgainBtn: "🔄 Play Again",
        notification: "Notification",
        
        // Card Topics
        topicHealth: "health",
        topicClimate: "climate",
        topicEnvironment: "environment",
        topicTech: "technology",
        topicScam: "digital scam",
        topicConsumer: "consumer",
        topicNutrition: "nutrition",
        topicEnergy: "consumer",
        
        // Action Messages
        actionShare: "shared news",
        actionFlag: "flagged",
        actionCheck: "fact-checked",
        actionFlagCorrect: "flagged correctly!",
        actionFlagWrong: "flagged incorrectly",
        actionDebunkSuccess: "debunked successfully!",
        actionCheckTrue: "verified as true",
        
        // Game Start
        gameStarting: "Game starting - Round 1",
        
        // Roles
        moderator: "Moderator",
        factChecker: "Fact-Checker",
        clickbait: "Clickbait",
        
        // Card Info
        virality: "🔥",
        credibility: "Credibility:",
        flagged: "🚩 Flagged",
        
        // Game Info
        you: "You",
        ai: "AI",
        
        // Learning Section
        learningSection: "🎓 What did you learn?",
        learnRedFlags: "🚩 Top red flags",
        learnMistakes: "❌ Review mistakes",
        learnTips: "💡 Next time tips",
        learnQuiz: "🎯 Quick quiz (3 questions)",
        learnSubmit: "Submit",
        learnCopy: "📋 Copy 5 takeaways",
        learnSave: "💾 Save to journal",
        learnCopied: "✅ Copied!",
        learnSaved: "✅ Saved!",
        learnNoFlags: "No red flags collected",
        learnNoMistakes: "No mistakes this time — great job!",
        learnSummary: "This run you reviewed {n} cards, made {f} correct flags and used {c} fact-checks.",
        learnQuizQ: "Is this TRUE, FALSE, MISLEADING or SATIRE?",
        learnQuizResult: "Your score: ",
        learnSuggestFlag: "Should flag it",
        learnSuggestShare: "Can share it",
        learnSuggestCheck: "Check first, then decide",
        learnSuggestSatire: "Mark as satire or ignore",
        learnSuggestDefault: "Verify from official sources",
        learnTipMod1: "Flag high-virality false cards early",
        learnTipMod2: "If unsure, ask Fact-Checker to verify first",
        learnTipFC1: "Spend tokens on cards that could swing the round",
        learnTipFC2: "Share verified true cards to dilute virality",
        learnTipCB1: "Share misleading/fake cards with high virality",
        learnTipCB2: "Flag an obvious fake occasionally to blend in"
    }
};

// Current language
let currentLanguage = localStorage.getItem('viralGuardLanguage') || 'vi';

// Get translation
function t(key) {
    return translations[currentLanguage][key] || key;
}

// Change language
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('viralGuardLanguage', lang);
    updateAllText();
}

// Update all text in the current screen
function updateAllText() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);
        
        if (element.tagName === 'INPUT' && element.type === 'checkbox') {
            // For checkboxes, update the label
            const label = element.nextElementSibling;
            if (label) {
                label.textContent = translation;
            }
        } else if (element.innerHTML.includes('<strong>') || element.innerHTML.includes('<')) {
            // If has HTML tags, use innerHTML
            element.innerHTML = translation;
        } else {
            element.textContent = translation;
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
    
    // Update language selector to show current language
    document.querySelectorAll('.language-btn').forEach(btn => {
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set up language selector
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const lang = e.target.dataset.lang;
            changeLanguage(lang);
        });
    });
    
    // Initial text update
    updateAllText();
});
