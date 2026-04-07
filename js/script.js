// ===== NAVIGATION =====
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active state from all nav buttons
    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.remove('active');
    });

    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }

    // Set active nav button
    const buttons = document.querySelectorAll('.nav-button');
    buttons.forEach(button => {
        if (button.textContent.toLowerCase().includes(sectionId.toLowerCase()) || 
            (sectionId === 'apply' && button.textContent.includes('Apply Trademark'))) {
            button.classList.add('active');
        }
    });

    // Update header tagline based on section
    const tagline = document.querySelector('.header-tagline');
    if (tagline) {
        switch(sectionId) {
            case 'dashboard':
                tagline.textContent = 'Trademark Management System';
                break;
            case 'search':
                tagline.textContent = 'Search Trademark Database';
                break;
            case 'apply':
                tagline.textContent = 'Apply to Register a Trademark Online';
                break;
            case 'payment':
                tagline.textContent = 'Payment Processing';
                break;
        }
    }
}

// ===== LANGUAGE SELECTOR =====
const languageButton = document.getElementById('languageButton');
const languageDropdown = document.getElementById('languageDropdown');
const currentLanguage = document.getElementById('currentLanguage');
const languageOptions = document.querySelectorAll('.language-option');

languageButton.addEventListener('click', (e) => {
    e.stopPropagation();
    languageDropdown.classList.toggle('hidden');
});

languageOptions.forEach(option => {
    option.addEventListener('click', () => {
        const selectedLanguage = option.getAttribute('data-lang');
        currentLanguage.textContent = selectedLanguage;
        languageDropdown.classList.add('hidden');
    });
});

document.addEventListener('click', (e) => {
    if (!languageButton.contains(e.target) && !languageDropdown.contains(e.target)) {
        languageDropdown.classList.add('hidden');
    }
});

// ===== DASHBOARD =====
function loadDraft() {
    const saved = localStorage.getItem('draftType');

    if (!saved) {
        alert('No draft found. Please create a new application.');
        return;
    }

    showSection('apply');

    // Find and select the saved card
    setTimeout(() => {
        const cards = document.querySelectorAll('.mark-type-card');
        cards.forEach(card => {
            const type = card.getAttribute('data-type');
            if (type && type.toLowerCase() === saved.toLowerCase()) {
                card.classList.add('active');
                selectedType = saved;
            }
        });
    }, 100);
}

function updateDashboardStatus() {
    const draftStatus = document.getElementById('draftStatus');
    const paymentStatus = document.getElementById('paymentStatus');

    if (localStorage.getItem('draftType')) {
        draftStatus.textContent = '1 draft available';
    } else {
        draftStatus.textContent = 'No drafts';
    }

    if (localStorage.getItem('paymentSession')) {
        paymentStatus.textContent = '1 pending payment session';
    } else {
        paymentStatus.textContent = 'No pending payments';
    }
}

// ===== SEARCH =====
const sampleData = [
    {name: 'COCA-COLA', status: 'Approved', type: 'Word'},
    {name: 'Nike Swoosh', status: 'Approved', type: 'Figurative'},
    {name: 'McDONALDS', status: 'Approved', type: 'Figurative with words'},
    {name: 'Apple iPhone', status: 'Approved', type: '3D'},
    {name: 'PEPSI', status: 'Pending', type: 'Word'},
    {name: 'Adidas Logo', status: 'Under Review', type: 'Figurative'},
    {name: 'STARBUCKS', status: 'Approved', type: 'Figurative with words'},
    {name: 'SAMSUNG', status: 'Approved', type: 'Word'},
];

function searchData() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const status = document.getElementById('statusFilter').value;
    const type = document.getElementById('typeFilter').value;

    const results = sampleData.filter(item => {
        const matchesQuery = !query || item.name.toLowerCase().includes(query);
        const matchesStatus = !status || item.status === status;
        const matchesType = !type || item.type === type;
        return matchesQuery && matchesStatus && matchesType;
    });

    const container = document.getElementById('resultsContainer');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = '<p class="results-placeholder">No results found. Try different search criteria.</p>';
        return;
    }

    const list = document.createElement('ul');
    list.className = 'results-list';

    results.forEach(result => {
        const item = document.createElement('li');
        item.className = 'result-item';

        const nameDiv = document.createElement('div');
        nameDiv.className = 'result-name';
        nameDiv.textContent = result.name;

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'result-details';

        const statusSpan = document.createElement('span');
        statusSpan.className = 'result-status';
        statusSpan.textContent = 'Status: ' + result.status;

        const typeSpan = document.createElement('span');
        typeSpan.className = 'result-type';
        typeSpan.textContent = 'Type: ' + result.type;

        detailsDiv.appendChild(statusSpan);
        detailsDiv.appendChild(typeSpan);

        item.appendChild(nameDiv);
        item.appendChild(detailsDiv);
        list.appendChild(item);
    });

    container.appendChild(list);
}

// Allow search on Enter key
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchData();
            }
        });
    }
});

// ===== APPLY TRADEMARK SECTION =====
let selectedType = null;

// Mark Type Card Selection
const markTypeCards = document.querySelectorAll('.mark-type-card');

markTypeCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove active state from all cards
        markTypeCards.forEach(c => c.classList.remove('active'));
        // Add active state to clicked card
        card.classList.add('active');
        
        // Save selection
        selectedType = card.getAttribute('data-type');
        
        // Auto-save
        localStorage.setItem('draftType', selectedType);
        
        const autoSaveText = document.querySelector('.auto-save');
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        autoSaveText.textContent = 'Auto-saved at ' + timeString;
        
        updateDashboardStatus();
    });
});

// Next Step
function nextStep() {
    if (!selectedType) {
        alert('Please select a mark type before continuing.');
        return;
    }

    alert('Proceeding with mark type: ' + selectedType + '\n\nIn a real application, this would navigate to step 2: Goods and Services.');
}

// Reset Form
const resetButton = document.querySelector('.reset-button');
if (resetButton) {
    resetButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset the application form? All entered data will be lost.')) {
            markTypeCards.forEach(c => c.classList.remove('active'));
            selectedType = null;
            localStorage.removeItem('draftType');
            updateDashboardStatus();
            console.log('Form reset');
        }
    });
}

// Print Button
const printButton = document.querySelector('.print-button');
if (printButton) {
    printButton.addEventListener('click', () => {
        window.print();
    });
}

// Trademark Search in sidebar
const sidebarSearchButton = document.querySelector('.action-panel .search-button');
if (sidebarSearchButton) {
    sidebarSearchButton.addEventListener('click', () => {
        showSection('search');
    });
}

// See More Types
const seeMoreButton = document.querySelector('.see-more-button');
if (seeMoreButton) {
    seeMoreButton.addEventListener('click', () => {
        alert('Additional mark types:\n\n• Sound mark\n• Motion mark\n• Color mark\n• Hologram mark\n• Position mark\n• Pattern mark\n\nThese would be displayed in a real application.');
    });
}

// ===== PAYMENT SECTION =====
function payNow() {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
    
    if (!selectedMethod) {
        alert('Please select a payment method.');
        return;
    }

    const methodText = selectedMethod.nextElementSibling.querySelector('.payment-option-title').textContent;
    const message = document.getElementById('paymentMessage');
    
    message.textContent = 'Processing payment via ' + methodText + '...';
    message.className = 'payment-message info';
    
    setTimeout(() => {
        message.textContent = 'Payment Successful! Reference Number: TM' + Date.now();
        message.className = 'payment-message success';
        localStorage.removeItem('paymentSession');
        updateDashboardStatus();
    }, 2000);
}

function savePaymentSession() {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
    
    if (!selectedMethod) {
        alert('Please select a payment method to save your session.');
        return;
    }

    const methodValue = selectedMethod.value;
    const methodText = selectedMethod.nextElementSibling.querySelector('.payment-option-title').textContent;
    
    const session = {
        method: methodValue,
        methodText: methodText,
        amount: 5500,
        timestamp: Date.now(),
        expiresIn: 24 * 60 * 60 * 1000 // 24 hours
    };
    
    localStorage.setItem('paymentSession', JSON.stringify(session));
    
    const message = document.getElementById('paymentMessage');
    message.textContent = 'Payment session saved! You can resume this payment within 24 hours. Selected method: ' + methodText;
    message.className = 'payment-message info';
    
    updateDashboardStatus();
    
    setTimeout(() => {
        if (confirm('Payment session saved successfully!\n\nWould you like to return to the dashboard?')) {
            showSection('dashboard');
        }
    }, 1000);
}

function loadPaymentSession() {
    const sessionData = localStorage.getItem('paymentSession');
    
    if (sessionData) {
        const session = JSON.parse(sessionData);
        const now = Date.now();
        
        // Check if session expired
        if (now - session.timestamp > session.expiresIn) {
            localStorage.removeItem('paymentSession');
            alert('Your payment session has expired. Please start a new payment.');
            return;
        }
        
        // Restore selected payment method
        const methodInput = document.querySelector('input[name="paymentMethod"][value="' + session.method + '"]');
        if (methodInput) {
            methodInput.checked = true;
        }
        
        const message = document.getElementById('paymentMessage');
        const hoursLeft = Math.floor((session.expiresIn - (now - session.timestamp)) / (60 * 60 * 1000));
        message.textContent = 'Payment session restored. Expires in ' + hoursLeft + ' hours.';
        message.className = 'payment-message info';
    }
}

// ===== AUTO-SAVE SIMULATION =====
let autoSaveInterval;

function simulateAutoSave() {
    const autoSaveText = document.querySelector('.auto-save');
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    autoSaveText.textContent = 'Auto-saved at ' + timeString;
}

// Simulate auto-save every 2 minutes
autoSaveInterval = setInterval(simulateAutoSave, 120000);

// ===== INITIALIZATION =====
window.addEventListener('load', () => {
    // Start on dashboard
    showSection('dashboard');
    
    // Update dashboard status
    updateDashboardStatus();
    
    // Load payment session if on payment page
    const currentSection = document.querySelector('.section-content.active');
    if (currentSection && currentSection.id === 'payment') {
        loadPaymentSession();
    }
    
    console.log('Trademark Management System initialized');
    console.log('All interactive features are ready');
});
