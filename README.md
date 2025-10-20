# 🛡️ Viral Guard - Misinformation Defense Game

## 🎮 Introduction
**Viral Guard** is a social deduction game with hidden roles focused on combating misinformation and fake news. Players take on the roles of community members in a social network, working together to stop saboteurs who are trying to spread misinformation.

### ✨ Key Features
- **Hidden role mechanics** inspired by Werewolf/Among Us
- **Social media feed interface** (Facebook/Instagram style)
- **25+ news cards** about real-world topics in Vietnam
- **Fact-checking system** with Fact-Checker tokens
- **10 random events** that change the game dynamics
- **Educational content** teaching 6 misinformation warning signs

---

## 🎯 Game Objectives

### Community Team (Moderators + Fact-Checker)
Keep the **Viral Meter** below the threshold after 6 rounds by:
- Flagging fake news
- Fact-checking information
- Preventing misinformation spread

### Saboteur Team (Clickbait)
Push the **Viral Meter** to the threshold or higher by:
- Sharing fake news
- Amplifying content (secret ability)
- Misleading other players

---

## 👥 Roles

### 🛡️ Moderator (Gác Cổng)
- **Number:** 2-4 players (depends on total players)
- **Special Ability:** Accurate flags reduce -2 Virality (instead of -1)
- **Objective:** Protect the community from fake news

### ✅ Fact-Checker
- **Number:** 0-1 player (can be disabled in menu)
- **Special Abilities:** 
  - 3-4 fact-check tokens (depends on difficulty)
  - Reveal credibility rating of cards
  - Successful debunk reduces -2 Virality next round
- **Objective:** Support Moderators with scientific verification

### 🔥 Clickbait
- **Number:** 1 player (hidden role)
- **Special Abilities:**
  - Amplify: Each round secretly +1 Virality to 1 random card
  - Dodge Check: Once per game, block 1 fact-check action
  - Bonus Points: +2 points if convincing others to share fake news
- **Objective:** Push Viral Meter to threshold

---

## 🎲 How to Play

### Setup
1. Select number of players (3-5 players)
2. Choose difficulty (Easy/Medium/Hard)
3. Enable/disable Fact-Checker role
4. System will randomly assign roles

### Each Round
1. **Draw Event:** An event card is revealed, affecting the round
2. **Draw 4 News Cards:** Displayed on the feed
3. **Player Turns:** Each player chooses 1 action:
   - **📢 Share:** Increase card's Virality to the Viral Meter
   - **🚩 Flag:** Prevent card spread, if correctly flagged as fake → reduces Virality
   - **✅ Fact-Check:** Reveal credibility rating with explanation (costs 1 token)
4. **Round Summary:** Apply event effects, move to next round

### Game End
- **Clickbait Wins:** Viral Meter ≥ threshold
- **Community Wins:** After 6 rounds, Viral Meter < threshold

---

## 📊 News Cards

The game features **25 news cards** divided into 4 types:

### ❌ Fake News (FALSE) - 10 cards
Completely fabricated, no scientific basis
- *Example: "Drinking lemon water kills virus in 24h"*
- **Credibility:** 0-30%

### ⚠️ Misleading News (MISLEADING) - 7 cards
Contains some truth but lacks context, exaggerated
- *Example: "Eating meat causes cancer" (missing WHO context)*
- **Credibility:** 30-60%

### ✅ True News (TRUE) - 5 cards
Accurate information from credible sources
- *Example: "Proper handwashing prevents disease - WHO recommendation"*
- **Credibility:** 70-100%

### 😂 Satire (SATIRE) - 2 cards
Humorous content, entertainment purpose
- *Example: "Students invent machine to postpone deadlines"*
- **Credibility:** 50% (neutral)

---

## 🔍 6 Warning Signs

The game teaches players to recognize 6 signs of fake news:

1. **🎣 Clickbait Headlines** - ALL CAPS, excessive exclamation marks
2. **❓ Missing Sources** - No credible organization citations
3. **😱 Emotional Manipulation** - Triggers fear, anger
4. **📅 Outdated Information** - Old photos, old events
5. **🔢 Suspicious Numbers** - Exaggerated, unverified statistics
6. **🖼️ Mismatched Images** - Photoshopped, from different events

---

## ⚙️ Difficulty Levels

| Difficulty | Viral Threshold | Fact-Check Tokens |
|--------|----------------|-------------------|
| 😊 Easy | 18 | 4 |
| 😐 Medium | 15 | 3 |
| 😰 Hard | 12 | 3 |

---

## 🎨 Technology Stack

- **HTML5** - Game structure
- **CSS3** - Feed layout, animations
- **Vanilla JavaScript** - Game logic, no frameworks
- **Module pattern** - Separated cards.js, events.js, roles.js

---

## 📂 File Structure

```
game_app/
├── index.html          # Main game interface (5 screens)
├── style.css           # Feed-style UI (1000+ lines)
├── cards.js            # 25 card data
├── events.js           # 10 event cards
├── roles.js            # Role configs & assignment
└── main.js             # Core game logic
```

---

## 🚀 How to Run

1. Open `index.html` in a web browser
2. No server required, runs offline
3. Recommended: Chrome/Edge/Firefox (latest versions)

---

## 🎓 Educational Message

### Players Will Learn:
- Recognize 6 signs of fake news
- Importance of fact-checking
- How misinformation spreads (virality mechanics)
- Critical thinking before sharing
- Impact of fake news on communities

### Real-World Applications:
- Pause before sharing
- Check information sources
- Use fact-checking tools (Google Reverse Image, VAFC.org.vn)
- Report fake news to platforms

---

## 🏆 Scoring

- **Share fake news (Clickbait):** +2 points
- **Accurate flag:** +3 points
- **Successful debunk:** +4 points
- **Fact-check true news:** +1 point

---

## 👨‍💻 Authors

Project developed for a hackathon with the theme "Educational Game about Misinformation".

---

## 📝 Notes

- Game simplified for easy play (6 rounds, 25 cards)
- AI players use basic logic (no ML)
- Can be extended: Multiplayer online, Database of cards, Analytics

---

## 🔗 References

- WHO Infodemic Management
- First Draft News - Essential Guide to Understanding Misinformation
- VAFC.org.vn - Vietnam Fact-Check Network
- Cambridge Analytica Case Study

---

**Play, learn, and spread the message: "PAUSE before you SHARE!"** 🛡️
