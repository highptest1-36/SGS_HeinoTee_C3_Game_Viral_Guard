// roles.js - Player Roles Configuration
const rolesConfig = {
    moderator: {
        name: "Gác Cổng",
        nameEn: "Moderator",
        icon: "🛡️",
        color: "#10b981",
        description: "Bạn là người bảo vệ cộng đồng. Hãy gắn cờ và kiểm chứng tin giả!",
        descriptionEn: "You are the community guardian. Flag and fact-check fake news!",
        objective: "Giữ Viral Meter dưới ngưỡng sau 6 vòng",
        objectiveEn: "Keep Viral Meter below threshold after 6 rounds",
        abilities: [
            "Gắn cờ hiệu quả: Nếu gắn cờ đúng thẻ tin giả, -2 Virality",
            "Làm việc nhóm với Fact-Checker để debunk tin sai"
        ],
        abilitiesEn: [
            "Effective flagging: If correctly flag fake news, -2 Virality",
            "Work with Fact-Checker to debunk misinformation"
        ],
        winCondition: "viral_below_threshold",
        team: "good"
    },
    
    factchecker: {
        name: "Fact-Checker",
        nameEn: "Fact-Checker",
        icon: "✅",
        color: "#3b82f6",
        description: "Bạn là chuyên gia kiểm chứng thông tin. Sử dụng token của bạn một cách khôn ngoan!",
        descriptionEn: "You are an information verification expert. Use your tokens wisely!",
        objective: "Hỗ trợ Gác Cổng thắng bằng cách kiểm chứng chính xác",
        objectiveEn: "Support Moderators to win by accurate fact-checking",
        abilities: [
            "Token kiểm chứng: 3-4 lần/game (tùy độ khó)",
            "Lật nguồn tin: Hiển thị độ tin cậy và giải thích",
            "Hạ nhiệt: Sau khi debunk, thẻ đó -2 Virality vòng sau"
        ],
        abilitiesEn: [
            "Fact-check tokens: 3-4 times/game (depends on difficulty)",
            "Reveal sources: Show credibility and explanation",
            "Cool down: After debunking, card gets -2 Virality next round"
        ],
        winCondition: "viral_below_threshold",
        team: "good"
    },
    
    clickbait: {
        name: "Giật Tít",
        nameEn: "Clickbait",
        icon: "🔥",
        color: "#ef4444",
        description: "Bạn là kẻ phá hoại! Hãy đẩy Viral Meter lên cao mà không để lộ thân phận.",
        descriptionEn: "You are the saboteur! Push Viral Meter high without revealing yourself.",
        objective: "Đẩy Viral Meter lên ngưỡng hoặc cao hơn",
        objectiveEn: "Push Viral Meter to threshold or higher",
        abilities: [
            "Khuấy sóng: Mỗi vòng chọn 1 thẻ để bí mật +1 Virality",
            "Lách kiểm chứng: 1 lần/game vô hiệu hóa 1 hành động fact-check",
            "Điểm thưởng: +2 điểm cá nhân nếu thuyết phục được người khác share tin sai"
        ],
        abilitiesEn: [
            "Stir up: Each round secretly +1 Virality to 1 card",
            "Evade checking: 1 time/game block a fact-check action",
            "Bonus points: +2 personal points if convince others to share fake news"
        ],
        winCondition: "viral_above_threshold",
        team: "evil"
    }
};

// Role distribution based on number of players
function getRoleDistribution(numPlayers, enableFactChecker) {
    const distributions = {
        3: enableFactChecker ? 
            ["clickbait", "moderator", "factchecker"] : 
            ["clickbait", "moderator", "moderator"],
        4: enableFactChecker ?
            ["clickbait", "moderator", "moderator", "factchecker"] :
            ["clickbait", "moderator", "moderator", "moderator"],
        5: enableFactChecker ?
            ["clickbait", "moderator", "moderator", "moderator", "factchecker"] :
            ["clickbait", "moderator", "moderator", "moderator", "moderator"]
    };
    
    return distributions[numPlayers] || distributions[4];
}

// Shuffle array helper
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Assign roles to players
function assignRoles(numPlayers, enableFactChecker) {
    const rolesList = getRoleDistribution(numPlayers, enableFactChecker);
    const shuffledRoles = shuffleArray(rolesList);
    
    // First player (index 0) is always the human player
    return shuffledRoles.map((role, index) => ({
        id: index,
        name: index === 0 ? "Bạn" : `AI ${index}`,
        role: role,
        roleConfig: rolesConfig[role],
        isHuman: index === 0,
        score: 0
    }));
}

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        rolesConfig,
        getRoleDistribution,
        assignRoles,
        shuffleArray
    };
}
