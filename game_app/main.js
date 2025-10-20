// main.js - Core Game Logic

// ===== LANGUAGE HELPER FUNCTIONS =====
function getCurrentLang() {
    return currentLanguage || 'vi';
}

function getCardText(card, field) {
    const lang = getCurrentLang();
    if (lang === 'en' && card[field + 'En']) {
        return card[field + 'En'];
    }
    return card[field];
}

function getEventText(event, field) {
    const lang = getCurrentLang();
    if (lang === 'en' && event[field + 'En']) {
        return event[field + 'En'];
    }
    return event[field];
}

// Generate action log messages in current language
function getActionLogMessage(player, action, card, result) {
    const lang = getCurrentLang();
    const cardTitle = getCardText(card, 'title').substring(0, 40);
    const playerName = player.isHuman && lang === 'en' ? 'You' : player.name;
    
    if (lang === 'en') {
        switch(action) {
            case 'share':
                if (result.correct) {
                    return `${playerName} shared accurate news! (+${result.viralityChange} Virality, +2 pts)`;
                } else {
                    return `${playerName} shared misinformation (-1 Trust, +${result.viralityChange} Virality)`;
                }
            case 'flag':
                if (result.correct) {
                    return `${playerName} flagged correctly! (-${result.reduction} Virality, +1 Trust)`;
                } else {
                    return `${playerName} flagged incorrectly (-1 Trust)`;
                }
            case 'check':
                if (card.credibility < 50) {
                    return `${playerName} debunked successfully! (Credibility: ${card.credibility}%, +1 Trust)`;
                } else {
                    return `${playerName} fact-checked accurate news (Credibility: ${card.credibility}%)`;
                }
        }
    } else {
        switch(action) {
            case 'share':
                if (result.correct) {
                    return `${playerName} chia sẻ tin đúng! (+${result.viralityChange} Virality, +2 điểm)`;
                } else {
                    return `${playerName} chia sẻ tin giả (-1 Trust, +${result.viralityChange} Virality)`;
                }
            case 'flag':
                if (result.correct) {
                    return `${playerName} gắn cờ chính xác! (-${result.reduction} Virality, +1 Trust)`;
                } else {
                    return `${playerName} gắn cờ nhầm (-1 Trust)`;
                }
            case 'check':
                if (card.credibility < 50) {
                    return `${playerName} debunk thành công! (Credibility: ${card.credibility}%, +1 Trust)`;
                } else {
                    return `${playerName} kiểm chứng tin đúng (Credibility: ${card.credibility}%)`;
                }
        }
    }
}

// Get translated role text
function getRoleText(roleConfig, field) {
    const lang = getCurrentLang();
    if (lang === 'en' && roleConfig[field + 'En']) {
        return roleConfig[field + 'En'];
    }
    return roleConfig[field];
}

// ===== GAME STATE =====
let gameState = {
    screen: 'menu', // menu, howtoplay, roleassign, play, results
    round: 1,
    maxRounds: 6,
    viralMeter: 0,
    trustMeter: 5,
    viralThreshold: 15, // will be adjusted by difficulty
    players: [],
    currentPlayerIndex: 0,
    deck: [],
    currentCards: [],
    usedCards: [],
    eventDeck: [],
    usedEvents: [],
    currentEvent: null,
    factCheckTokens: 3,
    actionLog: [],
    settings: {
        numPlayers: 4,
        difficulty: 'medium',
        enableFactChecker: true
    },
    selectedCard: null,
    selectedAction: null,
    clickbaitAbilityUsed: false, // has clickbait used block ability?
    eventDisablesCheck: false // does current event disable fact-checking?
};

// Difficulty settings
const difficultyConfig = {
    easy: { viralThreshold: 18, factCheckTokens: 4 },
    medium: { viralThreshold: 15, factCheckTokens: 3 },
    hard: { viralThreshold: 12, factCheckTokens: 3 }
};

// Initialize game
function initGame() {
    console.log('🎮 Initializing Viral Guard...');
    
    // Setup event listeners
    setupMenuListeners();
    setupHowToPlayListeners();
    setupRoleAssignListeners();
    setupPlayListeners();
    setupResultsListeners();
    setupLanguageListeners();
    
    console.log('✅ All event listeners setup complete');
    
    // Show menu screen
    showScreen('menu');
}

// Language listeners
function setupLanguageListeners() {
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            console.log('🌐 Switching language to:', lang);
            changeLanguage(lang);
            
            // Re-render current screen content if in play mode
            if (gameState.screen === 'play') {
                renderCards();
                updatePlayScreen();
            }
            
            // Update learning panel if on results screen
            if (gameState.screen === 'results') {
                try {
                    renderLearningPanel();
                } catch(e) {
                    console.warn('Learning panel update error:', e);
                }
            }
            
            // Update event modal if it's currently open
            const eventModal = document.getElementById('event-modal');
            if (eventModal && eventModal.classList.contains('active') && gameState.currentEvent) {
                const event = gameState.currentEvent;
                const eventName = getEventText(event, 'name');
                const eventDesc = getEventText(event, 'description');
                const eventMsg = getEventText(event, 'message');
                
                document.getElementById('event-title').textContent = `${event.icon} ${eventName}`;
                document.getElementById('event-description').textContent = eventDesc;
                document.getElementById('event-effect').textContent = eventMsg;
            }
            
            // Update action modal if it's currently open
            const actionModal = document.getElementById('action-modal');
            if (actionModal && actionModal.classList.contains('active') && gameState.selectedAction && gameState.selectedCard !== null) {
                const card = gameState.currentCards[gameState.selectedCard];
                const action = gameState.selectedAction;
                const currentPlayer = gameState.players[gameState.currentPlayerIndex];
                
                const actionTitles = {
                    share: lang === 'en' ? '📢 Share' : '📢 Chia sẻ',
                    flag: lang === 'en' ? '🚩 Flag' : '🚩 Gắn cờ',
                    check: lang === 'en' ? '✅ Fact-Check' : '✅ Kiểm chứng'
                };
                
                const actionDescriptions = {
                    share: lang === 'en' 
                        ? `Sharing this will increase Virality by ${card.virality}.`
                        : `Chia sẻ tin này sẽ tăng ${card.virality} Virality.`,
                    flag: lang === 'en'
                        ? `Flag this post to prevent spread. If it's fake news, -2 Virality!`
                        : `Gắn cờ tin này để ngăn lan truyền. Nếu đúng là tin giả, -2 Virality!`,
                    check: currentPlayer.role === 'factchecker' 
                        ? (lang === 'en' 
                            ? `✨ Special ability: Check for FREE! (No token spent)`
                            : `✨ Khả năng đặc biệt: Kiểm chứng MIỄN PHÍ! (Không mất token)`)
                        : (lang === 'en'
                            ? `Use 1 token to reveal credibility. ${gameState.factCheckTokens} tokens remaining.`
                            : `Sử dụng 1 token để lật mở độ tin cậy. Còn ${gameState.factCheckTokens} token.`)
                };
                
                document.getElementById('action-modal-title').textContent = actionTitles[action];
                document.getElementById('action-modal-card-title').textContent = getCardText(card, 'title');
                document.getElementById('action-modal-description').textContent = actionDescriptions[action];
            }
        });
    });
}

// Screen management
function showScreen(screenName) {
    gameState.screen = screenName;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`${screenName}-screen`).classList.add('active');
    
    if (screenName === 'play') {
        updatePlayScreen();
    }
}

// ===== MENU SCREEN =====
function setupMenuListeners() {
    console.log('📋 Setting up menu listeners...');
    
    const startBtn = document.getElementById('start-btn');
    const howToPlayBtn = document.getElementById('how-to-play-btn');
    
    if (!startBtn) console.error('❌ start-btn not found!');
    if (!howToPlayBtn) console.error('❌ how-to-play-btn not found!');
    
    if (startBtn) startBtn.addEventListener('click', startGame);
    if (howToPlayBtn) howToPlayBtn.addEventListener('click', () => showScreen('howtoplay'));
    
    // Player count selector
    document.querySelectorAll('.player-count-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.player-count-btn').forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
            gameState.settings.numPlayers = parseInt(e.target.dataset.players);
            console.log('👥 Players set to:', gameState.settings.numPlayers);
        });
    });
    
    // Difficulty selector
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('selected'));
            e.target.classList.add('selected');
            gameState.settings.difficulty = e.target.dataset.difficulty;
            console.log('⚙️ Difficulty set to:', gameState.settings.difficulty);
        });
    });
    
    // Fact-checker toggle
    const factcheckerToggle = document.getElementById('factchecker-toggle');
    if (factcheckerToggle) {
        factcheckerToggle.addEventListener('change', (e) => {
            gameState.settings.enableFactChecker = e.target.checked;
            console.log('✅ Fact-checker enabled:', gameState.settings.enableFactChecker);
        });
    }
    
    console.log('✅ Menu listeners ready');
}

function startGame() {
    // Apply difficulty settings
    const difficulty = difficultyConfig[gameState.settings.difficulty];
    gameState.viralThreshold = difficulty.viralThreshold;
    gameState.factCheckTokens = difficulty.factCheckTokens;
    
    // Setup decks
    gameState.deck = shuffleArray([...cardsData]);
    gameState.eventDeck = shuffleArray([...eventsData]);
    gameState.usedCards = [];
    gameState.usedEvents = [];
    
    // Assign roles
    gameState.players = assignRoles(gameState.settings.numPlayers, gameState.settings.enableFactChecker);
    
    // Reset state
    gameState.round = 1;
    gameState.viralMeter = 0;
    gameState.trustMeter = 5;
    gameState.currentPlayerIndex = 0;
    gameState.actionLog = [];
    gameState.clickbaitAbilityUsed = false;
    
    // Show role assignment screen
    showRoleAssignment();
}

// ===== HOW TO PLAY SCREEN =====
function setupHowToPlayListeners() {
    document.getElementById('back-to-menu-btn').addEventListener('click', () => showScreen('menu'));
    document.getElementById('start-from-howto-btn').addEventListener('click', startGame);
}

// ===== ROLE ASSIGNMENT SCREEN =====
function showRoleAssignment() {
    showScreen('roleassign');
    
    const humanPlayer = gameState.players[0];
    const roleConfig = humanPlayer.roleConfig;
    const lang = getCurrentLang();
    
    // Update role reveal UI with translations
    document.getElementById('role-icon').textContent = roleConfig.icon;
    document.getElementById('role-name').textContent = getRoleText(roleConfig, 'name');
    document.getElementById('role-name-en').textContent = roleConfig.nameEn;
    document.getElementById('role-description').textContent = getRoleText(roleConfig, 'description');
    document.getElementById('role-objective').textContent = getRoleText(roleConfig, 'objective');
    
    const abilitiesList = document.getElementById('role-abilities');
    const abilities = lang === 'en' && roleConfig.abilitiesEn ? roleConfig.abilitiesEn : roleConfig.abilities;
    abilitiesList.innerHTML = abilities.map(ability => 
        `<li>${ability}</li>`
    ).join('');
    
    // Set role color
    document.documentElement.style.setProperty('--role-color', roleConfig.color);
    document.getElementById('role-reveal').style.setProperty('--role-color', roleConfig.color);
}

function setupRoleAssignListeners() {
    // Reveal role button
    const revealBtn = document.getElementById('btn-reveal-role');
    if (revealBtn) {
        revealBtn.addEventListener('click', () => {
            // Hide reveal button
            revealBtn.style.display = 'none';
            
            // Show role display
            const roleDisplay = document.getElementById('role-display');
            roleDisplay.style.display = 'block';
            
            // Show start game button after 2 seconds
            setTimeout(() => {
                document.getElementById('start-game-btn').style.display = 'block';
            }, 2000);
        });
    }
    
    // Start game button
    document.getElementById('start-game-btn').addEventListener('click', () => {
        showScreen('play');
        startRound();
    });
}

// ===== PLAY SCREEN =====
function setupPlayListeners() {
    console.log('🎮 Setting up play screen listeners...');
    
    // Action buttons
    const shareBtn = document.getElementById('share-action-btn');
    const flagBtn = document.getElementById('flag-action-btn');
    const checkBtn = document.getElementById('check-action-btn');
    
    if (!shareBtn) console.error('❌ share-action-btn not found!');
    if (!flagBtn) console.error('❌ flag-action-btn not found!');
    if (!checkBtn) console.error('❌ check-action-btn not found!');
    
    if (shareBtn) shareBtn.addEventListener('click', () => {
        console.log('📢 Share button clicked');
        selectAction('share');
    });
    if (flagBtn) flagBtn.addEventListener('click', () => {
        console.log('🚩 Flag button clicked');
        selectAction('flag');
    });
    if (checkBtn) checkBtn.addEventListener('click', () => {
        console.log('✅ Check button clicked');
        selectAction('check');
    });
    
    // Modal confirm
    const confirmBtn = document.getElementById('confirm-action-btn');
    const cancelBtn = document.getElementById('cancel-action-btn');
    
    if (confirmBtn) confirmBtn.addEventListener('click', confirmAction);
    if (cancelBtn) cancelBtn.addEventListener('click', closeActionModal);
    
    // Event modal
    const eventContinueBtn = document.getElementById('event-continue-btn');
    if (eventContinueBtn) eventContinueBtn.addEventListener('click', closeEventModal);
    
    // Round summary modal
    const roundSummaryBtn = document.getElementById('round-summary-continue-btn');
    if (roundSummaryBtn) {
        roundSummaryBtn.addEventListener('click', () => {
            closeRoundSummaryModal();
            if (checkGameEnd()) {
                endGame();
            } else {
                startRound();
            }
        });
    }
    
    console.log('✅ Play screen listeners ready');
}

function startRound() {
    gameState.eventDisablesCheck = false;
    
    // Draw event
    drawEvent();
    
    // Draw 4 cards for the round
    drawCards(4);
    
    // Reset current player to human
    gameState.currentPlayerIndex = 0;
    
    // Update UI
    updatePlayScreen();
    
    // If first turn is AI, start AI turn
    if (!gameState.players[gameState.currentPlayerIndex].isHuman) {
        setTimeout(aiTurn, 1000);
    }
}

function drawEvent() {
    if (gameState.eventDeck.length === 0) {
        gameState.eventDeck = shuffleArray([...eventsData]);
        gameState.usedEvents = [];
    }
    
    gameState.currentEvent = gameState.eventDeck.pop();
    gameState.usedEvents.push(gameState.currentEvent);
    
    // Show event modal
    showEventModal();
    
    // Apply event effect
    if (gameState.currentEvent.effect === 'disable_check') {
        gameState.eventDisablesCheck = true;
    }
}

function showEventModal() {
    const event = gameState.currentEvent;
    const eventModal = document.getElementById('event-modal');
    
    if (!eventModal) {
        console.error('❌ event-modal not found!');
        return;
    }
    
    const lang = getCurrentLang();
    const eventName = getEventText(event, 'name');
    const eventDesc = getEventText(event, 'description');
    const eventMsg = getEventText(event, 'message');
    
    document.getElementById('event-title').textContent = `${event.icon} ${eventName}`;
    document.getElementById('event-description').textContent = eventDesc;
    document.getElementById('event-effect').textContent = eventMsg;
    eventModal.classList.add('active');
    
    console.log('📢 Event modal shown:', eventName);
}

function closeEventModal() {
    const eventModal = document.getElementById('event-modal');
    if (eventModal) {
        eventModal.classList.remove('active');
        console.log('✅ Event modal closed');
    }
}

function drawCards(count) {
    gameState.currentCards = [];
    
    for (let i = 0; i < count; i++) {
        if (gameState.deck.length === 0) {
            // Reshuffle used cards back into deck
            gameState.deck = shuffleArray([...gameState.usedCards]);
            gameState.usedCards = [];
        }
        
        const card = gameState.deck.pop();
        card.virality = card.baseVirality || 1;
        card.flagged = false;
        card.checked = false;
        gameState.currentCards.push(card);
    }
    
    renderCards();
}

function renderCards() {
    const grid = document.getElementById('feed-cards');
    
    if (!grid) {
        console.error('❌ feed-cards grid not found!');
        return;
    }
    
    grid.innerHTML = '';
    console.log('🎴 Rendering', gameState.currentCards.length, 'cards');
    
    const lang = getCurrentLang();
    
    gameState.currentCards.forEach((card, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'feed-card';
        cardEl.dataset.index = index;
        
        if (card.flagged) cardEl.classList.add('flagged');
        if (card.checked) cardEl.classList.add('checked');
        if (gameState.selectedCard === index) cardEl.classList.add('selected');
        
        const cardTitle = getCardText(card, 'title');
        const cardTopic = getCardText(card, 'topic');
        const cardReveal = getCardText(card, 'reveal');
        const flaggedText = lang === 'en' ? '🚩 Flagged' : '🚩 Đã gắn cờ';
        const credibilityText = lang === 'en' ? 'Credibility:' : 'Độ tin cậy:';
        
        cardEl.innerHTML = `
            <div class="feed-card-header">
                <span class="feed-card-topic">${cardTopic}</span>
                <span class="feed-card-virality">🔥 ${card.virality}</span>
            </div>
            <div class="feed-card-title">${cardTitle}</div>
            ${card.flagged ? `<div class="feed-card-flag">${flaggedText}</div>` : ''}
            ${card.checked ? `
                <div class="feed-card-reveal">
                    <div class="credibility-score" style="color: ${getCredibilityColor(card.credibility)}">
                        ${credibilityText} ${card.credibility}%
                    </div>
                    <div class="reveal-text">${cardReveal}</div>
                </div>
            ` : ''}
        `;
        
        cardEl.addEventListener('click', () => {
            console.log('🖱️ Card clicked:', index, cardTitle.substring(0, 30));
            selectCard(index);
        });
        grid.appendChild(cardEl);
    });
    
    console.log('✅ Cards rendered, event listeners attached');
}

function getCredibilityColor(credibility) {
    if (credibility >= 70) return '#10b981';
    if (credibility >= 40) return '#f59e0b';
    return '#ef4444';
}

function selectCard(index) {
    console.log('🃏 Card selected:', index);
    gameState.selectedCard = index;
    renderCards();
    
    // Update action buttons state
    updateActionButtons();
}

function updateActionButtons() {
    const card = gameState.currentCards[gameState.selectedCard];
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    
    const shareBtn = document.getElementById('share-action-btn');
    const flagBtn = document.getElementById('flag-action-btn');
    const checkBtn = document.getElementById('check-action-btn');
    
    if (!shareBtn || !flagBtn || !checkBtn) {
        console.error('❌ Action buttons not found in updateActionButtons');
        return;
    }
    
    shareBtn.disabled = !card;
    flagBtn.disabled = !card || (card && card.flagged);
    
    // Check button disabled if: no card, already checked, no tokens, or event disables it
    checkBtn.disabled = !card || (card && card.checked) || gameState.factCheckTokens === 0 || gameState.eventDisablesCheck || !gameState.settings.enableFactChecker;
    
    console.log('🔘 Buttons updated - Share:', !shareBtn.disabled, 'Flag:', !flagBtn.disabled, 'Check:', !checkBtn.disabled);
}

function selectAction(action) {
    if (gameState.selectedCard === null) return;
    
    gameState.selectedAction = action;
    const card = gameState.currentCards[gameState.selectedCard];
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    
    // Show action modal
    const lang = getCurrentLang();
    const actionTitles = {
        share: lang === 'en' ? '📢 Share' : '📢 Chia sẻ',
        flag: lang === 'en' ? '🚩 Flag' : '🚩 Gắn cờ',
        check: lang === 'en' ? '✅ Fact-Check' : '✅ Kiểm chứng'
    };
    
    const actionDescriptions = {
        share: lang === 'en' 
            ? `Sharing this will increase Virality by ${card.virality}.`
            : `Chia sẻ tin này sẽ tăng ${card.virality} Virality.`,
        flag: lang === 'en'
            ? `Flag this post to prevent spread. If it's fake news, -2 Virality!`
            : `Gắn cờ tin này để ngăn lan truyền. Nếu đúng là tin giả, -2 Virality!`,
        check: currentPlayer.role === 'factchecker' 
            ? (lang === 'en' 
                ? `✨ Special ability: Check for FREE! (No token spent)`
                : `✨ Khả năng đặc biệt: Kiểm chứng MIỄN PHÍ! (Không mất token)`)
            : (lang === 'en'
                ? `Use 1 token to reveal credibility. ${gameState.factCheckTokens} tokens remaining.`
                : `Sử dụng 1 token để lật mở độ tin cậy. Còn ${gameState.factCheckTokens} token.`)
    };
    
    document.getElementById('action-modal-title').textContent = actionTitles[action];
    document.getElementById('action-modal-card-title').textContent = getCardText(card, 'title');
    document.getElementById('action-modal-description').textContent = actionDescriptions[action];
    document.getElementById('action-modal').classList.add('active');
}

function closeActionModal() {
    document.getElementById('action-modal').classList.remove('active');
}

function confirmAction() {
    const card = gameState.currentCards[gameState.selectedCard];
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const action = gameState.selectedAction;
    
    // Execute action
    executeAction(currentPlayer, card, action);
    
    // Close modal
    closeActionModal();
    
    // Move to next player
    nextTurn();
}

function executeAction(player, card, action) {
    let result = { viralityChange: 0, reduction: 0, correct: false };
    
    switch(action) {
        case 'share':
            result.viralityChange = card.virality;
            gameState.viralMeter += card.virality;
            result.correct = card.credibility >= 50;
            
            // Correct share bonus
            if (result.correct) {
                player.score += 2;
            }
            
            // Clickbait gets bonus points for sharing false info
            if (player.role === 'clickbait' && card.credibility < 50) {
                player.score += 2;
            }
            break;
            
        case 'flag':
            card.flagged = true;
            // If correctly flagged a false card, reduce virality
            if (card.credibility < 50) {
                result.correct = true;
                result.reduction = player.role === 'moderator' ? 2 : 1;
                card.virality = Math.max(0, card.virality - result.reduction);
                gameState.viralMeter = Math.max(0, gameState.viralMeter - 1);
                gameState.trustMeter += 1;
                player.score += 3;
            } else {
                gameState.trustMeter = Math.max(0, gameState.trustMeter - 1);
            }
            break;
            
        case 'check':
            card.checked = true;
            
            // Fact-Checker's special ability: Check without spending tokens
            if (player.role !== 'factchecker') {
                gameState.factCheckTokens--;
            }
            
            // Debunk effect: reduce virality next round
            if (card.credibility < 50) {
                card.virality = Math.max(0, card.virality - 2);
                gameState.trustMeter += 1;
                player.score += 4;
            } else {
                player.score += 1;
            }
            break;
    }
    
    // Add to log with language support
    const logMessage = getActionLogMessage(player, action, card, result);
    addActionLog(logMessage, player, action, card, result);
    
    // Apply clickbait secret ability (if it's clickbait's turn)
    if (player.role === 'clickbait') {
        applyClickbaitAbility();
    }
    
    // Update UI
    renderCards();
    updateMeters();
    updatePlayScreen();
}

function applyClickbaitAbility() {
    // Clickbait secretly adds +1 virality to a random unchecked card
    const uncheckedCards = gameState.currentCards.filter(c => !c.checked && !c.flagged);
    if (uncheckedCards.length > 0) {
        const randomCard = uncheckedCards[Math.floor(Math.random() * uncheckedCards.length)];
        randomCard.virality += 1;
        // Don't log this - it's secret!
    }
}

function addActionLog(message, player, action, card, result) {
    gameState.actionLog.unshift({
        round: gameState.round,
        message: message,
        timestamp: new Date().toLocaleTimeString('vi-VN'),
        // Store data for learning panel
        playerId: player?.id,
        action: action,
        cardId: card?.id,
        card: card,
        correct: result?.correct || false
    });
    
    // Keep only last 20 logs
    if (gameState.actionLog.length > 20) {
        gameState.actionLog = gameState.actionLog.slice(0, 20);
    }
    
    updateActionLog();
}

function updateActionLog() {
    const logEl = document.getElementById('action-log');
    logEl.innerHTML = gameState.actionLog.map(log => 
        `<div class="log-entry">
            <span class="log-round">R${log.round}</span>
            <span class="log-message">${log.message}</span>
        </div>`
    ).join('');
}

function nextTurn() {
    gameState.currentPlayerIndex++;
    
    // If all players have taken action this round
    if (gameState.currentPlayerIndex >= gameState.players.length) {
        endRound();
    } else {
        updatePlayScreen();
        
        // If next player is AI, trigger AI turn
        if (!gameState.players[gameState.currentPlayerIndex].isHuman) {
            setTimeout(aiTurn, 1500);
        }
    }
}

function aiTurn() {
    const aiPlayer = gameState.players[gameState.currentPlayerIndex];
    
    // Simple AI logic
    let action, cardIndex;
    
    if (aiPlayer.role === 'clickbait') {
        // Clickbait AI: Share cards with low credibility
        const falseCards = gameState.currentCards
            .map((c, i) => ({card: c, index: i}))
            .filter(item => !item.card.checked && item.card.credibility < 50);
        
        if (falseCards.length > 0) {
            const chosen = falseCards[Math.floor(Math.random() * falseCards.length)];
            cardIndex = chosen.index;
            action = 'share';
        } else {
            // Share random card
            cardIndex = Math.floor(Math.random() * gameState.currentCards.length);
            action = 'share';
        }
    } else if (aiPlayer.role === 'factchecker') {
        // Fact-checker AI: Check suspicious cards
        const suspiciousCards = gameState.currentCards
            .map((c, i) => ({card: c, index: i}))
            .filter(item => !item.card.checked && !item.card.flagged);
        
        if (suspiciousCards.length > 0 && gameState.factCheckTokens > 0 && !gameState.eventDisablesCheck) {
            const chosen = suspiciousCards[Math.floor(Math.random() * suspiciousCards.length)];
            cardIndex = chosen.index;
            action = 'check';
        } else {
            // Flag suspicious cards
            const unflaggedCards = gameState.currentCards
                .map((c, i) => ({card: c, index: i}))
                .filter(item => !item.card.flagged);
            
            if (unflaggedCards.length > 0) {
                cardIndex = unflaggedCards[0].index;
                action = 'flag';
            }
        }
    } else {
        // Moderator AI: Flag suspicious cards
        const unflaggedCards = gameState.currentCards
            .map((c, i) => ({card: c, index: i}))
            .filter(item => !item.card.flagged);
        
        if (unflaggedCards.length > 0) {
            cardIndex = unflaggedCards[0].index;
            action = Math.random() > 0.3 ? 'flag' : 'share';
        } else {
            cardIndex = Math.floor(Math.random() * gameState.currentCards.length);
            action = 'share';
        }
    }
    
    // Execute AI action
    gameState.selectedCard = cardIndex;
    const card = gameState.currentCards[cardIndex];
    executeAction(aiPlayer, card, action);
    
    // Move to next turn
    nextTurn();
}

function endRound() {
    // Apply event effects at end of round
    applyEventEffects();
    
    // Move cards to used pile
    gameState.usedCards.push(...gameState.currentCards);
    gameState.currentCards = [];
    
    // Show round summary
    showRoundSummary();
}

function applyEventEffects() {
    const event = gameState.currentEvent;
    
    switch(event.effect) {
        case 'viral':
            gameState.currentCards.forEach(card => {
                if (event.targetType === 'all') {
                    gameState.viralMeter += event.modifier;
                } else if (event.targetType === 'unchecked' && !card.checked) {
                    card.virality += event.modifier;
                } else if (event.targetType === 'false' && card.credibility < 50) {
                    card.virality += event.modifier;
                } else if (event.targetType === 'random') {
                    // Already applied to random card
                }
            });
            break;
            
        case 'trust':
            gameState.trustMeter += event.modifier;
            break;
    }
    
    updateMeters();
}

function showRoundSummary() {
    document.getElementById('round-number-summary').textContent = gameState.round;
    document.getElementById('viral-score-summary').textContent = gameState.viralMeter;
    document.getElementById('trust-score-summary').textContent = gameState.trustMeter;
    
    document.getElementById('round-summary-modal').classList.add('active');
}

function closeRoundSummaryModal() {
    document.getElementById('round-summary-modal').classList.remove('active');
    gameState.round++;
}

function checkGameEnd() {
    // Check win/lose conditions
    if (gameState.viralMeter >= gameState.viralThreshold) {
        return true; // Clickbait wins
    }
    
    if (gameState.round > gameState.maxRounds) {
        return true; // Team wins if viral meter below threshold
    }
    
    return false;
}

function endGame() {
    showScreen('results');
    
    const lang = getCurrentLang();
    const clickbaitWins = gameState.viralMeter >= gameState.viralThreshold;
    
    // Update results screen
    const titleElement = document.getElementById('game-result-title');
    const messageElement = document.getElementById('game-result-message');
    
    if (clickbaitWins) {
        titleElement.textContent = lang === 'en' ? '🔥 Clickbait Wins!' : '� Clickbait Thắng!';
        messageElement.textContent = lang === 'en' ? 
            'Misinformation spread! Viral Meter exceeded threshold.' :
            'Tin giả đã lan tràn! Viral Meter vượt ngưỡng.';
    } else {
        titleElement.textContent = lang === 'en' ? '🛡️ Community Wins!' : '🛡️ Cộng Đồng Thắng!';
        messageElement.textContent = lang === 'en' ?
            'Excellent! Community controlled misinformation.' :
            'Tuyệt vời! Cộng đồng đã kiểm soát được tin giả.';
    }
    
    document.getElementById('final-viral').textContent = gameState.viralMeter;
    document.getElementById('final-trust').textContent = gameState.trustMeter;
    document.getElementById('final-rounds').textContent = gameState.round - 1;
    
    // Render scoreboard
    const scoreboard = document.getElementById('scoreboard-list');
    const sortedPlayers = [...gameState.players].sort((a, b) => b.score - a.score);
    const pointsText = lang === 'en' ? 'pts' : 'điểm';
    
    scoreboard.innerHTML = sortedPlayers.map((player, index) => `
        <div class="scoreboard-row ${index === 0 ? 'winner' : ''}">
            <span class="rank">#${index + 1}</span>
            <span class="player-name">${player.name}</span>
            <span class="player-role" style="color: ${player.roleConfig.color}">
                ${player.roleConfig.icon} ${player.roleConfig.name}
            </span>
            <span class="player-score">${player.score} ${pointsText}</span>
        </div>
    `).join('');
    
    // Render learning section
    try {
        renderLearningPanel();
    } catch(e) {
        console.warn('Learning panel error:', e);
    }
}

function setupResultsListeners() {
    document.getElementById('play-again-btn').addEventListener('click', () => {
        // Reset and go back to menu
        showScreen('menu');
    });
}

// Update play screen UI
function updatePlayScreen() {
    // Update round counter
    document.getElementById('current-round').textContent = gameState.round;
    document.getElementById('max-rounds').textContent = gameState.maxRounds;
    
    // Update meters
    updateMeters();
    
    // Update current player indicator
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const lang = getCurrentLang();
    const playerName = currentPlayer.isHuman && lang === 'en' ? 'You' : currentPlayer.name;
    document.getElementById('current-player-name').textContent = playerName;
    document.getElementById('current-player-role').textContent = currentPlayer.roleConfig.icon;
    
    // Update players list
    const playersList = document.getElementById('players-list');
    playersList.innerHTML = gameState.players.map(player => {
        const displayName = player.isHuman && lang === 'en' ? 'You' : player.name;
        return `
            <div class="player-item ${player.id === gameState.currentPlayerIndex ? 'active' : ''}">
                <span class="player-icon">${player.roleConfig.icon}</span>
                <span class="player-name">${displayName}</span>
                <span class="player-score">${player.score}pts</span>
            </div>
        `;
    }).join('');
    
    // Update tokens display
    document.getElementById('fact-check-tokens').textContent = gameState.factCheckTokens;
    
    // Update action buttons
    updateActionButtons();
}

function updateMeters() {
    const viralPercent = Math.min(100, (gameState.viralMeter / gameState.viralThreshold) * 100);
    const trustPercent = Math.min(100, (gameState.trustMeter / 10) * 100);
    
    document.getElementById('viral-meter-fill').style.width = `${viralPercent}%`;
    document.getElementById('viral-meter-value').textContent = `${gameState.viralMeter}/${gameState.viralThreshold}`;
    
    document.getElementById('trust-meter-fill').style.width = `${trustPercent}%`;
    document.getElementById('trust-meter-value').textContent = gameState.trustMeter;
}

// Helper: shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ===== LEARNING PANEL =====
function renderLearningPanel() {
    const lang = getCurrentLang();
    
    // 1. Collect data
    const seenCards = [...gameState.usedCards, ...gameState.currentCards];
    const actionLog = gameState.actionLog || [];
    
    // Build summary
    buildLearningSummary(seenCards, actionLog, lang);
    
    // Build red flags
    buildRedFlags(seenCards, lang);
    
    // Build mistakes
    buildMistakes(actionLog, seenCards, lang);
    
    // Build tips
    buildRoleTips(lang);
    
    // Build quiz
    buildQuiz(seenCards, lang);
    
    // Setup actions
    setupLearnActions(seenCards, actionLog, lang);
}

function buildLearningSummary(seenCards, actionLog, lang) {
    const summaryEl = document.getElementById('learning-summary');
    if (!summaryEl) return;
    
    const total = seenCards.length;
    const correctFlags = actionLog.filter(e => e.action === 'flag' && e.correct).length;
    const checks = actionLog.filter(e => e.action === 'check').length;
    
    const text = t('learnSummary')
        .replace('{n}', total)
        .replace('{f}', correctFlags)
        .replace('{c}', checks);
    
    summaryEl.innerHTML = `<p>${escapeHtml(text)}</p>`;
}

function buildRedFlags(seenCards, lang) {
    const flagsEl = document.getElementById('learn-flags');
    if (!flagsEl) return;
    
    const flagCounter = {};
    seenCards.forEach(card => {
        const signals = lang === 'en' && card.signalsEn ? card.signalsEn : (card.signals || []);
        signals.forEach(s => {
            flagCounter[s] = (flagCounter[s] || 0) + 1;
        });
    });
    
    const topFlags = Object.entries(flagCounter)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    if (topFlags.length === 0) {
        flagsEl.innerHTML = `<li>${t('learnNoFlags')}</li>`;
    } else {
        flagsEl.innerHTML = topFlags
            .map(([s, n]) => `<li>${escapeHtml(s)} <span class="muted">×${n}</span></li>`)
            .join('');
    }
}

function buildMistakes(actionLog, seenCards, lang) {
    const mistakesEl = document.getElementById('learn-mistakes');
    if (!mistakesEl) return;
    
    const mistakes = [];
    actionLog.forEach(entry => {
        if (entry.correct === false) {
            const card = seenCards.find(c => c.id === entry.cardId) || entry.card;
            if (card) {
                const title = getCardText(card, 'title').substring(0, 50);
                const suggestion = suggestBetterAction(card);
                mistakes.push(`${title}... → ${suggestion}`);
            }
        }
    });
    
    if (mistakes.length === 0) {
        mistakesEl.innerHTML = `<li>${t('learnNoMistakes')}</li>`;
    } else {
        mistakesEl.innerHTML = mistakes
            .map(m => `<li>${escapeHtml(m)}</li>`)
            .join('');
    }
}

function buildRoleTips(lang) {
    const tipsEl = document.getElementById('learn-tips');
    if (!tipsEl) return;
    
    const humanPlayer = gameState.players[0];
    const role = humanPlayer.role;
    
    let tips = [];
    if (role === 'moderator') {
        tips = [t('learnTipMod1'), t('learnTipMod2')];
    } else if (role === 'factchecker') {
        tips = [t('learnTipFC1'), t('learnTipFC2')];
    } else if (role === 'clickbait') {
        tips = [t('learnTipCB1'), t('learnTipCB2')];
    }
    
    tipsEl.innerHTML = tips.map(tip => `<li>${escapeHtml(tip)}</li>`).join('');
}

function buildQuiz(seenCards, lang) {
    const quizItemsEl = document.getElementById('quiz-items');
    const submitBtn = document.getElementById('quiz-submit');
    const resultEl = document.getElementById('quiz-result');
    
    if (!quizItemsEl || !submitBtn || !resultEl) return;
    
    // Pick 3 unique cards
    const shuffled = shuffleArray(seenCards);
    const picked = shuffled.slice(0, Math.min(3, shuffled.length));
    
    const answers = {};
    quizItemsEl.innerHTML = '';
    
    picked.forEach((card, idx) => {
        const qId = `q${idx}`;
        const title = getCardText(card, 'title');
        const correctAnswer = card.type ? card.type.toUpperCase() : 'FALSE';
        answers[qId] = correctAnswer;
        
        const options = ['TRUE', 'FALSE', 'MISLEADING', 'SATIRE'];
        
        const questionHTML = `
            <div class="quiz-item">
                <div class="question-title">${t('learnQuizQ')}</div>
                <div class="card-title">"${escapeHtml(title)}"</div>
                ${options.map(opt => `
                    <label>
                        <input type="radio" name="${qId}" value="${opt}">
                        ${opt}
                    </label>
                `).join('')}
            </div>
        `;
        
        quizItemsEl.insertAdjacentHTML('beforeend', questionHTML);
    });
    
    // Enable submit when all answered
    quizItemsEl.addEventListener('change', () => {
        const allAnswered = Object.keys(answers).every(q => 
            quizItemsEl.querySelector(`input[name="${q}"]:checked`)
        );
        submitBtn.disabled = !allAnswered;
    });
    
    // Submit handler
    submitBtn.onclick = () => {
        let score = 0;
        const total = Object.keys(answers).length;
        
        Object.entries(answers).forEach(([q, correctAns]) => {
            const selected = quizItemsEl.querySelector(`input[name="${q}"]:checked`)?.value;
            if (selected === correctAns) score++;
        });
        
        resultEl.textContent = `${t('learnQuizResult')}${score}/${total}`;
        submitBtn.disabled = true;
    };
}

function setupLearnActions(seenCards, actionLog, lang) {
    const copyBtn = document.getElementById('learn-copy');
    const saveBtn = document.getElementById('learn-save');
    
    if (copyBtn) {
        copyBtn.onclick = async () => {
            const takeaways = generateTakeaways(seenCards, actionLog, lang);
            try {
                await navigator.clipboard.writeText(takeaways);
                copyBtn.textContent = t('learnCopied');
                setTimeout(() => {
                    copyBtn.textContent = t('learnCopy');
                }, 2000);
            } catch(e) {
                console.warn('Copy failed', e);
            }
        };
    }
    
    if (saveBtn) {
        saveBtn.onclick = () => {
            const takeaways = generateTakeaways(seenCards, actionLog, lang);
            const journal = JSON.parse(localStorage.getItem('vg_journal') || '[]');
            journal.push({
                timestamp: Date.now(),
                takeaways: takeaways
            });
            localStorage.setItem('vg_journal', JSON.stringify(journal));
            
            saveBtn.textContent = t('learnSaved');
            setTimeout(() => {
                saveBtn.textContent = t('learnSave');
            }, 2000);
        };
    }
}

function generateTakeaways(seenCards, actionLog, lang) {
    const lines = ['=== My 5 Takeaways from Viral Guard ===', ''];
    
    // Top 3 red flags
    const flagCounter = {};
    seenCards.forEach(card => {
        const signals = lang === 'en' && card.signalsEn ? card.signalsEn : (card.signals || []);
        signals.forEach(s => {
            flagCounter[s] = (flagCounter[s] || 0) + 1;
        });
    });
    
    const topFlags = Object.entries(flagCounter)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);
    
    topFlags.forEach(([s, n]) => {
        lines.push(`• Red flag: ${s} (seen ${n}x)`);
    });
    
    // Role tips
    const humanPlayer = gameState.players[0];
    const role = humanPlayer.role;
    let tip1 = '', tip2 = '';
    
    if (role === 'moderator') {
        tip1 = t('learnTipMod1');
        tip2 = t('learnTipMod2');
    } else if (role === 'factchecker') {
        tip1 = t('learnTipFC1');
        tip2 = t('learnTipFC2');
    } else if (role === 'clickbait') {
        tip1 = t('learnTipCB1');
        tip2 = t('learnTipCB2');
    }
    
    if (tip1) lines.push(`• Tip: ${tip1}`);
    if (tip2) lines.push(`• Tip: ${tip2}`);
    
    return lines.join('\n');
}

function suggestBetterAction(card) {
    const type = (card.type || '').toUpperCase();
    
    if (type === 'FALSE') return t('learnSuggestFlag');
    if (type === 'TRUE') return t('learnSuggestShare');
    if (type === 'MISLEADING') return t('learnSuggestCheck');
    if (type === 'SATIRE') return t('learnSuggestSatire');
    
    return t('learnSuggestDefault');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);
