// events.js - Event Cards Data
const eventsData = [
    {
        id: "ev001",
        name: "Bão tin đồn",
        nameEn: "Rumor Storm",
        icon: "🌪️",
        description: "Một tin đồn lan truyền nhanh trên mạng xã hội",
        descriptionEn: "A rumor spreads rapidly on social media",
        effect: "viral",
        modifier: +1,
        targetType: "unchecked",
        message: "+1 Virality cho tất cả thẻ chưa kiểm chứng",
        messageEn: "+1 Virality for all unchecked cards"
    },
    {
        id: "ev002",
        name: "Tuần lễ truyền thông số an toàn",
        nameEn: "Digital Safety Week",
        icon: "📚",
        description: "Chính phủ tăng cường chiến dịch giáo dục",
        descriptionEn: "Government intensifies education campaign",
        effect: "trust",
        modifier: +1,
        targetType: "all",
        message: "+1 Trust Meter",
        messageEn: "+1 Trust Meter"
    },
    {
        id: "ev003",
        name: "KOL chia sẻ",
        nameEn: "Influencer Shares",
        icon: "⭐",
        description: "Một influencer có ảnh hưởng lớn chia sẻ tin",
        descriptionEn: "A major influencer shares content",
        effect: "viral",
        modifier: +2,
        targetType: "random",
        message: "+2 Virality cho 1 thẻ ngẫu nhiên",
        messageEn: "+2 Virality for 1 random card"
    },
    {
        id: "ev004",
        name: "Thuật toán ưu tiên nội dung địa phương",
        nameEn: "Algorithm Favors Local Content",
        icon: "🇻🇳",
        description: "Platform thay đổi thuật toán",
        descriptionEn: "Platform changes algorithm",
        effect: "mixed",
        modifier: {local: +1, international: -1},
        targetType: "conditional",
        message: "Tin địa phương +1, tin quốc tế -1 Virality",
        messageEn: "Local news +1, international -1 Virality"
    },
    {
        id: "ev005",
        name: "Cúp mạng cục bộ",
        nameEn: "Network Outage",
        icon: "📡",
        description: "Sự cố kỹ thuật gián đoạn kết nối",
        descriptionEn: "Technical issue disrupts connection",
        effect: "disable_check",
        modifier: 0,
        targetType: "all",
        message: "Không thể fact-check vòng này!",
        messageEn: "Cannot fact-check this round!"
    },
    {
        id: "ev006",
        name: "Fact-checker độc lập lên tiếng",
        nameEn: "Independent Fact-Checkers Speak Up",
        icon: "✅",
        description: "Các tổ chức kiểm chứng đưa ra báo cáo",
        descriptionEn: "Fact-checking organizations release reports",
        effect: "viral",
        modifier: -2,
        targetType: "false",
        message: "-2 Virality cho thẻ tin giả",
        messageEn: "-2 Virality for fake news cards"
    },
    {
        id: "ev007",
        name: "Breaking News!",
        nameEn: "Breaking News!",
        icon: "📰",
        description: "Sự kiện nóng thu hút sự chú ý",
        descriptionEn: "Hot event attracts attention",
        effect: "viral",
        modifier: +2,
        targetType: "all",
        message: "+2 Virality toàn bộ thẻ (mọi người háo hức)",
        messageEn: "+2 Virality for all cards (everyone excited)"
    },
    {
        id: "ev008",
        name: "Bot tấn công",
        nameEn: "Bot Attack",
        icon: "🤖",
        description: "Mạng lưới bot tự động chia sẻ tin",
        descriptionEn: "Bot network automatically shares content",
        effect: "viral",
        modifier: +1,
        targetType: "false",
        message: "+1 Virality cho thẻ tin giả (bot lan truyền)",
        messageEn: "+1 Virality for fake news (bots spreading)"
    },
    {
        id: "ev009",
        name: "Người dùng tỉnh táo hơn",
        nameEn: "Users More Alert",
        icon: "🧠",
        description: "Cộng đồng bắt đầu đặt câu hỏi nhiều hơn",
        descriptionEn: "Community starts asking more questions",
        effect: "trust",
        modifier: +1,
        targetType: "all",
        message: "+1 Trust Meter",
        messageEn: "+1 Trust Meter"
    },
    {
        id: "ev010",
        name: "Sự kiện bình thường",
        nameEn: "Normal Day",
        icon: "😌",
        description: "Không có sự kiện đặc biệt nào xảy ra",
        descriptionEn: "No special events occur",
        effect: "none",
        modifier: 0,
        targetType: "none",
        message: "Không có sự kiện đặc biệt",
        messageEn: "No special events"
    }
];

// Export for use in main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = eventsData;
}
