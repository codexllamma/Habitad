// Global variables
let habits = [
    { id: 1, name: 'Drink 8 glasses of water', streak: 12, category: 'Health', priority: 'high', completed: false },
    { id: 2, name: 'Read for 30 minutes', streak: 8, category: 'Learning', priority: 'high', completed: false },
    { id: 3, name: 'Exercise for 45 minutes', streak: 15, category: 'Fitness', priority: 'high', completed: false },
    { id: 4, name: 'Meditate for 10 minutes', streak: 22, category: 'Wellness', priority: 'medium', completed: false },
    { id: 5, name: 'Write in journal', streak: 6, category: 'Reflection', priority: 'medium', completed: false },
    { id: 6, name: 'Practice gratitude', streak: 18, category: 'Mindfulness', priority: 'medium', completed: false },
    { id: 7, name: 'Learn a new word', streak: 4, category: 'Learning', priority: 'low', completed: false },
    { id: 8, name: 'Take vitamins', streak: 28, category: 'Health', priority: 'low', completed: false }
];

let journalEntries = [];
let meditationTimer = null;
let meditationDuration = 0;
let meditationTimeLeft = 0;
let isTimerRunning = false;

const journalPrompts = [
    "What are three things I'm grateful for today?",
    "What challenged me today and how did I overcome it?",
    "What did I learn about myself today?",
    "What made me smile or laugh today?",
    "How did I show kindness to myself or others?",
    "What are my hopes for tomorrow?"
];

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'habits':
            initHabitsPage();
            break;
        case 'journaling':
            initJournalingPage();
            break;
        case 'meditation':
            initMeditationPage();
            break;
    }
    
    // Load saved data
    loadSavedData();
});

// Utility functions
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '');
    return page === '' || page === 'index' ? 'home' : page;
}

function saveData() {
    localStorage.setItem('habitadData', JSON.stringify({
        habits: habits,
        journalEntries: journalEntries
    }));
}

function loadSavedData() {
    const saved = localStorage.getItem('habitadData');
    if (saved) {
        const data = JSON.parse(saved);
        if (data.habits) habits = data.habits;
        if (data.journalEntries) journalEntries = data.journalEntries;
    }
}

// Modal functions
function showAuthModal() {
    document.getElementById('authModal').style.display = 'block';
}

function hideAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('authModal');
    if (event.target === modal) {
        hideAuthModal();
    }
}

// Habits page functions
function initHabitsPage() {
    renderHabits();
    updateProgress();
}

function renderHabits() {
    const container = document.getElementById('habitsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    habits.forEach((habit, index) => {
        const habitCard = document.createElement('div');
        habitCard.className = `habit-card ${habit.completed ? 'completed' : ''}`;
        habitCard.style.animationDelay = `${index * 100}ms`;
        
        habitCard.innerHTML = `
            <div class="habit-content">
                <div class="habit-left">
                    <div class="habit-checkbox ${habit.completed ? 'checked' : ''}" onclick="toggleHabit(${habit.id})">
                        ${habit.completed ? '✓' : ''}
                    </div>
                    <div class="habit-info">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                            ${getPriorityIcon(habit.priority)}
                            <h3>${habit.name}</h3>
                        </div>
                        <span class="habit-category category-${habit.category.toLowerCase()}">${habit.category}</span>
                    </div>
                </div>
                <div class="habit-streak">
                    <div class="streak-number">
                        🔥 <span>${habit.streak}</span>
                    </div>
                    <div class="streak-label">days</div>
                </div>
            </div>
        `;
        
        container.appendChild(habitCard);
    });
}

function getPriorityIcon(priority) {
    switch(priority) {
        case 'high': return '⭐';
        case 'medium': return '☆';
        default: return '';
    }
}

function toggleHabit(habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
        habit.completed = !habit.completed;
        renderHabits();
        updateProgress();
        saveData();
    }
}

function updateProgress() {
    const progressText = document.getElementById('progressText');
    if (!progressText) return;
    
    const completedCount = habits.filter(h => h.completed).length;
    progressText.textContent = `You've completed ${completedCount} out of ${habits.length} habits today.`;
}

// Planner functions
function saveGoals() {
    const textarea = document.getElementById('goalsTextarea');
    if (textarea) {
        const goals = textarea.value;
        localStorage.setItem('habitadGoals', goals);
        alert('Goals saved successfully!');
    }
}

// Load goals on planner page
if (getCurrentPage() === 'planner') {
    document.addEventListener('DOMContentLoaded', function() {
        const textarea = document.getElementById('goalsTextarea');
        const saved = localStorage.getItem('habitadGoals');
        if (textarea && saved) {
            textarea.value = saved;
        }
    });
}

// Journaling page functions
function initJournalingPage() {
    updateJournalDate();
    renderPrompts();
    renderRecentEntries();
    setupCharacterCounter();
}

function updateJournalDate() {
    const dateElement = document.getElementById('journalDate');
    if (dateElement) {
        const today = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}

function renderPrompts() {
    const promptsList = document.getElementById('promptsList');
    if (!promptsList) return;
    
    promptsList.innerHTML = '';
    
    journalPrompts.forEach(prompt => {
        const promptItem = document.createElement('div');
        promptItem.className = 'prompt-item';
        promptItem.onclick = () => addPromptToJournal(prompt);
        promptItem.innerHTML = `<p>${prompt}</p>`;
        promptsList.appendChild(promptItem);
    });
}

function addPromptToJournal(prompt) {
    const textarea = document.getElementById('journalTextarea');
    if (textarea) {
        const currentText = textarea.value;
        textarea.value = currentText + (currentText ? '\n\n' : '') + prompt + '\n';
        updateCharacterCount();
        textarea.focus();
    }
}

function setupCharacterCounter() {
    const textarea = document.getElementById('journalTextarea');
    const counter = document.getElementById('characterCount');
    
    if (textarea && counter) {
        textarea.addEventListener('input', updateCharacterCount);
        updateCharacterCount();
    }
}

function updateCharacterCount() {
    const textarea = document.getElementById('journalTextarea');
    const counter = document.getElementById('characterCount');
    
    if (textarea && counter) {
        counter.textContent = `${textarea.value.length} characters`;
    }
}

function saveJournalEntry() {
    const textarea = document.getElementById('journalTextarea');
    if (!textarea || !textarea.value.trim()) {
        alert('Please write something before saving!');
        return;
    }
    
    const entry = {
        id: Date.now(),
        content: textarea.value.trim(),
        date: new Date().toISOString()
    };
    
    journalEntries.unshift(entry);
    textarea.value = '';
    updateCharacterCount();
    renderRecentEntries();
    saveData();
    alert('Journal entry saved!');
}

function renderRecentEntries() {
    const container = document.getElementById('recentEntries');
    if (!container) return;
    
    if (journalEntries.length === 0) {
        container.innerHTML = '<p class="no-entries">No entries yet. Start writing!</p>';
        return;
    }
    
    container.innerHTML = '';
    
    journalEntries.slice(0, 3).forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'recent-entry';
        entryDiv.innerHTML = `
            <p>${entry.content}</p>
            <div class="entry-meta">Entry #${journalEntries.length - index}</div>
        `;
        container.appendChild(entryDiv);
    });
}

// Meditation page functions
function initMeditationPage() {
    // Meditation timer is initialized when duration is selected
}

function setDuration() {
    const select = document.getElementById('durationSelect');
    const display = document.getElementById('timerDisplay');
    const timeDisplay = document.getElementById('timerTime');
    
    if (!select.value) {
        display.style.display = 'none';
        return;
    }
    
    meditationDuration = parseInt(select.value) * 60; // Convert to seconds
    meditationTimeLeft = meditationDuration;
    
    updateTimerDisplay();
    display.style.display = 'block';
    resetTimer();
}

function updateTimerDisplay() {
    const timeDisplay = document.getElementById('timerTime');
    if (!timeDisplay) return;
    
    const minutes = Math.floor(meditationTimeLeft / 60);
    const seconds = meditationTimeLeft % 60;
    timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function toggleTimer() {
    const button = document.getElementById('playPauseBtn');
    
    if (isTimerRunning) {
        // Pause timer
        clearInterval(meditationTimer);
        isTimerRunning = false;
        button.textContent = '▶️ Start';
    } else {
        // Start timer
        if (meditationTimeLeft <= 0) {
            meditationTimeLeft = meditationDuration;
        }
        
        meditationTimer = setInterval(() => {
            meditationTimeLeft--;
            updateTimerDisplay();
            
            if (meditationTimeLeft <= 0) {
                clearInterval(meditationTimer);
                isTimerRunning = false;
                button.textContent = '▶️ Start';
                alert('Meditation session complete! 🧘‍♀️');
            }
        }, 1000);
        
        isTimerRunning = true;
        button.textContent = '⏸️ Pause';
    }
}

function resetTimer() {
    clearInterval(meditationTimer);
    isTimerRunning = false;
    meditationTimeLeft = meditationDuration;
    updateTimerDisplay();
    
    const button = document.getElementById('playPauseBtn');
    if (button) {
        button.textContent = '▶️ Start';
    }
}

// Navigation active state management
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        const linkPage = href.replace('.html', '').replace('index', 'home');
        
        if ((currentPage === 'home' && linkPage === 'index') || 
            linkPage.includes(currentPage)) {
            link.classList.add('active');
        }
    });
});

// Form submissions (prevent default for demo)
document.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('This is a demo. Form submission is disabled.');
    hideAuthModal();
});

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add some visual feedback for interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('feature-card') || 
        e.target.classList.contains('cta-button') ||
        e.target.classList.contains('save-button') ||
        e.target.classList.contains('control-button')) {
        
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key closes modal
    if (e.key === 'Escape') {
        hideAuthModal();
    }
    
    // Ctrl/Cmd + S saves content
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        const currentPage = getCurrentPage();
        
        if (currentPage === 'planner') {
            saveGoals();
        } else if (currentPage === 'journaling') {
            saveJournalEntry();
        }
    }
});

// Auto-save functionality for text areas
let autoSaveTimeout;
document.addEventListener('input', function(e) {
    if (e.target.tagName === 'TEXTAREA') {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            const currentPage = getCurrentPage();
            if (currentPage === 'planner') {
                const goals = e.target.value;
                localStorage.setItem('habitadGoals', goals);
            }
        }, 2000); // Auto-save after 2 seconds of inactivity
    }
});

// Initialize tooltips and other interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add loading states to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit') {
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 1000);
            }
        });
    });
});

// Performance optimization: Debounce resize events
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Handle responsive adjustments if needed
        const currentPage = getCurrentPage();
        if (currentPage === 'habits') {
            renderHabits();
        }
    }, 250);
});

// Add visual feedback for habit completion
function celebrateHabitCompletion() {
    // Simple celebration animation
    const celebration = document.createElement('div');
    celebration.innerHTML = '🎉';
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 4rem;
        z-index: 9999;
        pointer-events: none;
        animation: celebrate 1s ease-out forwards;
    `;
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        document.body.removeChild(celebration);
    }, 1000);
}

// Add CSS animation for celebration
const style = document.createElement('style');
style.textContent = `
    @keyframes celebrate {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1) translateY(-100px); }
    }
`;
document.head.appendChild(style);