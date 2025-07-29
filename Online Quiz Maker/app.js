/* Enhanced QuizMaker JS – Fixed Event Binding */
(function() {
  'use strict';

  /* -------------------------------- Utilities -------------------------------- */
  function $(sel, scope) {
    return (scope || document).querySelector(sel);
  }

  function $$(sel, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(sel));
  }

  function showToast(msg, type, duration) {
    var container = $('#toastContainer');
    if (!container) return;
    var toast = document.createElement('div');
    toast.className = 'toast status status--' + (type || 'info');
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(function() { toast.remove(); }, duration || 3500);
  }

  /* ---------------------------------- Data ---------------------------------- */
  var sampleUsers = [
    { id: 1, username: 'john_doe', email: 'john@example.com', password: 'password123', createdAt: '2024-01-15T10:00:00Z' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', password: 'password123', createdAt: '2024-01-16T09:30:00Z' }
  ];

  var sampleQuizzes = [
    {
      id: 1,
      title: 'JavaScript Fundamentals',
      description: 'Test your knowledge of basic JavaScript concepts and syntax',
      creatorId: 1,
      createdAt: '2024-01-20T14:00:00Z',
      questions: [
        { id: 1, question: "What does 'var' keyword do in JavaScript?", options: ['Declares a variable', 'Creates a function', 'Defines a class', 'Imports a module'], correctAnswer: 0, explanation: "The 'var' keyword is used to declare variables." },
        { id: 2, question: 'Which method adds an element to the end of an array?', options: ['append()', 'push()', 'add()', 'insert()'], correctAnswer: 1, explanation: 'The push() method adds elements to the end of an array.' },
        { id: 3, question: "What is the result of '3' + 2 in JavaScript?", options: ['5', "'32'", '32', 'Error'], correctAnswer: 1, explanation: "JavaScript performs string concatenation, resulting in '32'." },
        { id: 4, question: 'Which company developed JavaScript?', options: ['Microsoft', 'Google', 'Netscape', 'Apple'], correctAnswer: 2, explanation: 'JavaScript was originally developed by Netscape Communications.' }
      ]
    },
    {
      id: 2,
      title: 'World Geography',
      description: 'Challenge your knowledge of countries, capitals, and landmarks',
      creatorId: 2,
      createdAt: '2024-01-21T11:30:00Z',
      questions: [
        { id: 5, question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], correctAnswer: 2, explanation: 'Canberra is the capital city of Australia.' },
        { id: 6, question: 'Which is the longest river in the world?', options: ['Amazon River', 'Nile River', 'Mississippi River', 'Yangtze River'], correctAnswer: 1, explanation: 'The Nile River is widely considered the longest river in the world.' },
        { id: 7, question: 'Mount Everest is located in which mountain range?', options: ['Andes', 'Rocky Mountains', 'Alps', 'Himalayas'], correctAnswer: 3, explanation: 'Mount Everest is part of the Himalayan mountain range.' }
      ]
    },
    {
      id: 3,
      title: 'Science & Technology',
      description: 'Explore questions about modern science, technology, and innovations',
      creatorId: 1,
      createdAt: '2024-01-22T16:45:00Z',
      questions: [
        { id: 8, question: 'What does CPU stand for?', options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Core Processing Unit'], correctAnswer: 0, explanation: 'CPU stands for Central Processing Unit.' },
        { id: 9, question: "Which element has the chemical symbol 'O'?", options: ['Gold', 'Silver', 'Oxygen', 'Iron'], correctAnswer: 2, explanation: "The chemical symbol 'O' represents Oxygen." },
        { id: 10, question: 'What is the speed of light in a vacuum?', options: ['300,000 km/s', '299,792,458 m/s', '150,000 km/s', 'Both A and B'], correctAnswer: 3, explanation: 'The speed of light is approximately 300,000 km/s or exactly 299,792,458 m/s.' }
      ]
    }
  ];

  var users = sampleUsers.slice();
  var quizzes = sampleQuizzes.slice();
  var attempts = [];
  var currentUser = null;

  function genId(arr) {
    if (!arr.length) return 1;
    var maxId = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id > maxId) maxId = arr[i].id;
    }
    return maxId + 1;
  }

  /* -------------------------------- Router -------------------------------- */
  function switchPage(id) {
    $$('.page').forEach(function(p) { p.classList.remove('active'); });
    var tgt = $('#' + id);
    if (tgt) tgt.classList.add('active');
    var nav = $('#mobileNav');
    if (nav && !nav.classList.contains('hidden')) nav.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ------------------------------- Auth UI ------------------------------- */
  function updateAuthUI() {
    if (currentUser) {
      $$('.auth-guest').forEach(function(el) { el.style.display = 'none'; });
      $$('.auth-required').forEach(function(el) { el.style.display = ''; });
      var userName = $('#userName');
      if (userName) userName.textContent = currentUser.username;
      var mobileUserName = $('.user-name-mobile');
      if (mobileUserName) mobileUserName.textContent = currentUser.username;
    } else {
      $$('.auth-guest').forEach(function(el) { el.style.display = ''; });
      $$('.auth-required').forEach(function(el) { el.style.display = 'none'; });
    }
  }

  /* -------------------------------- Modal -------------------------------- */
  function openAuthModal(mode) {
    var modal = $('#authModal');
    if (!modal) return;
    var title = $('#authModalTitle');
    if (title) title.textContent = mode === 'login' ? 'Login' : 'Register';
    var loginForm = $('#loginForm');
    var registerForm = $('#registerForm');
    if (loginForm) loginForm.classList.toggle('hidden', mode !== 'login');
    if (registerForm) registerForm.classList.toggle('hidden', mode === 'login');
    modal.classList.remove('hidden');
  }

  function closeAuthModal() {
    var modal = $('#authModal');
    if (modal) modal.classList.add('hidden');
  }

  /* ----------------------------- Quiz Rendering ----------------------------- */
  function renderQuizGrid(list, container) {
    if (!container) return;
    container.innerHTML = '';
    if (!list.length) {
      container.innerHTML = '<p>No quizzes available.</p>';
      return;
    }
    for (var i = 0; i < list.length; i++) {
      var q = list[i];
      var creator = null;
      for (var j = 0; j < users.length; j++) {
        if (users[j].id === q.creatorId) {
          creator = users[j];
          break;
        }
      }
      var creatorName = creator ? creator.username : 'Unknown';
      var card = document.createElement('article');
      card.className = 'quiz-card';
      card.innerHTML = '<div class="quiz-card__body"><h4>' + q.title + '</h4><p>' + q.description + '</p><small>By: ' + creatorName + '</small></div><div class="quiz-card__footer"><span>' + q.questions.length + ' questions</span><button class="btn btn--primary btn--sm take-quiz-btn" data-id="' + q.id + '">Take Quiz</button></div>';
      container.appendChild(card);
    }
  }

  /* ----------------------------- Quiz Creation ----------------------------- */
  function setupQuizCreation() {
    var qc = $('#questionsContainer');
    if (!qc) return;

    function updateProgress() {
      var total = $$('.question-card', qc).length;
      var pct = Math.min(total * 10, 100);
      var fill = $('#createProgressFill');
      var text = $('#createProgressText');
      if (fill) fill.style.width = pct + '%';
      if (text) text.textContent = total + ' Question' + (total === 1 ? '' : 's');
    }

    function renumberCards() {
      $$('.question-card', qc).forEach(function(c, i) {
        var header = $('.question-card-header h4', c);
        if (header) header.textContent = 'Question ' + (i + 1);
        $$('.correct-answer-radio', c).forEach(function(r) {
          r.name = 'correct-' + i;
        });
      });
      updateProgress();
    }

    function addCard() {
      var idx = $$('.question-card', qc).length;
      var div = document.createElement('div');
      div.className = 'question-card';
      var optionsMarkup = '';
      var labels = ['A', 'B', 'C', 'D'];
      for (var i = 0; i < labels.length; i++) {
        optionsMarkup += '<div class="option-input"><input type="radio" class="correct-answer-radio" name="correct-' + idx + '" value="' + i + '" required><input type="text" class="form-control option-text" placeholder="Option ' + labels[i] + '" required></div>';
      }
      div.innerHTML = '<div class="question-card-header"><h4>Question ' + (idx + 1) + '</h4><button type="button" class="remove-question-btn">&times;</button></div><div class="form-group"><label class="form-label">Question Text</label><input type="text" class="form-control question-text" required></div><div class="options-list">' + optionsMarkup + '</div>';
      qc.appendChild(div);
      var removeBtn = $('.remove-question-btn', div);
      if (removeBtn) {
        removeBtn.addEventListener('click', function() {
          div.remove();
          renumberCards();
        });
      }
      updateProgress();
    }

    if (!qc.children.length) addCard();
    var addBtn = $('#addQuestionBtn');
    if (addBtn) addBtn.addEventListener('click', addCard);

    var form = $('#createQuizForm');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!currentUser) {
          showToast('Please login first', 'error');
          openAuthModal('login');
          return;
        }
        var titleEl = $('#quizTitle');
        var descEl = $('#quizDescription');
        if (!titleEl || !descEl) return;
        var title = titleEl.value.trim();
        var desc = descEl.value.trim();
        var cards = $$('.question-card', qc);
        if (!cards.length) {
          showToast('Add at least one question', 'warning');
          return;
        }
        var questions = [];
        var valid = true;
        for (var i = 0; i < cards.length; i++) {
          var card = cards[i];
          var qTextEl = $('.question-text', card);
          var optTexts = $$('.option-text', card);
          var correctRadio = $('.correct-answer-radio:checked', card);
          if (!qTextEl || !correctRadio) {
            valid = false;
            continue;
          }
          var qText = qTextEl.value.trim();
          var opts = [];
          for (var j = 0; j < optTexts.length; j++) {
            opts.push(optTexts[j].value.trim());
          }
          if (!qText || opts.some(function(o) { return !o; })) valid = false;
          questions.push({
            id: i + 1,
            question: qText,
            options: opts,
            correctAnswer: parseInt(correctRadio.value, 10),
            explanation: ''
          });
        }
        if (!valid) {
          showToast('Please complete all fields', 'error');
          return;
        }
        quizzes.push({
          id: genId(quizzes),
          title: title,
          description: desc,
          creatorId: currentUser.id,
          createdAt: new Date().toISOString(),
          questions: questions
        });
        showToast('Quiz created successfully', 'success');
        form.reset();
        qc.innerHTML = '';
        addCard();
        renderQuizGrid(quizzes, $('#quizGrid'));
        switchPage('browsePage');
      });
    }
  }

  /* ----------------------------- Quiz Taking ----------------------------- */
  var currentQuiz = null;
  var qIdx = 0;
  var selections = [];
  var letters = ['A', 'B', 'C', 'D'];

  function setupQuizTaking() {
    var qGrid = $('#quizGrid');
    var qCont = $('#questionContainer');
    var nextBtn = $('#nextQuestionBtn');
    var prevBtn = $('#prevQuestionBtn');
    var submitBtn = $('#submitQuizBtn');

    function renderQuestion() {
      if (!currentQuiz || !currentQuiz.questions[qIdx]) return;
      var q = currentQuiz.questions[qIdx];
      var optionsMarkup = '';
      for (var i = 0; i < q.options.length; i++) {
        var selected = selections[qIdx] === i ? ' selected' : '';
        optionsMarkup += '<button class="answer-btn' + selected + '" data-idx="' + i + '"><strong>' + letters[i] + '.</strong> ' + q.options[i] + '</button>';
      }
      if (qCont) qCont.innerHTML = '<h3>' + q.question + '</h3>' + optionsMarkup;

      var fill = $('#progressFill');
      var text = $('#progressText');
      if (fill) fill.style.width = ((qIdx + 1) / currentQuiz.questions.length) * 100 + '%';
      if (text) text.textContent = 'Question ' + (qIdx + 1) + ' of ' + currentQuiz.questions.length;

      if (prevBtn) prevBtn.disabled = qIdx === 0;
      if (qIdx === currentQuiz.questions.length - 1) {
        if (nextBtn) nextBtn.classList.add('hidden');
        if (submitBtn) submitBtn.classList.remove('hidden');
      } else {
        if (nextBtn) nextBtn.classList.remove('hidden');
        if (submitBtn) submitBtn.classList.add('hidden');
      }
    }

    if (qGrid) {
      qGrid.addEventListener('click', function(e) {
        var btn = e.target.closest('.take-quiz-btn');
        if (!btn) return;
        var id = parseInt(btn.dataset.id, 10);
        for (var i = 0; i < quizzes.length; i++) {
          if (quizzes[i].id === id) {
            currentQuiz = quizzes[i];
            break;
          }
        }
        if (!currentQuiz) return;
        qIdx = 0;
        selections = new Array(currentQuiz.questions.length);
        for (var j = 0; j < selections.length; j++) selections[j] = null;
        var header = $('#quizHeader');
        if (header) header.innerHTML = '<h2>' + currentQuiz.title + '</h2><p>' + currentQuiz.description + '</p>';
        renderQuestion();
        switchPage('takePage');
      });
    }

    if (qCont) {
      qCont.addEventListener('click', function(e) {
        var btn = e.target.closest('.answer-btn');
        if (!btn) return;
        var idx = parseInt(btn.dataset.idx, 10);
        selections[qIdx] = idx;
        $$('.answer-btn').forEach(function(b) {
          b.classList.remove('selected', 'correct', 'wrong');
        });
        btn.classList.add('selected');
        var isCorrect = idx === currentQuiz.questions[qIdx].correctAnswer;
        btn.classList.add(isCorrect ? 'correct' : 'wrong');
        setTimeout(function() {
          if (qIdx < currentQuiz.questions.length - 1) {
            qIdx++;
            renderQuestion();
          } else {
            if (submitBtn) submitBtn.click();
          }
        }, 800);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        if (qIdx < currentQuiz.questions.length - 1) {
          qIdx++;
          renderQuestion();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        if (qIdx > 0) {
          qIdx--;
          renderQuestion();
        }
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', function() {
        var hasNull = false;
        for (var i = 0; i < selections.length; i++) {
          if (selections[i] === null) {
            hasNull = true;
            break;
          }
        }
        if (hasNull) {
          showToast('Answer all questions', 'warning');
          return;
        }
        var score = 0;
        for (var j = 0; j < selections.length; j++) {
          if (selections[j] === currentQuiz.questions[j].correctAnswer) score++;
        }
        var attempt = {
          id: genId(attempts),
          quizId: currentQuiz.id,
          userId: currentUser ? currentUser.id : null,
          answers: selections.slice(),
          score: score,
          completedAt: new Date().toISOString()
        };
        attempts.push(attempt);
        showResults(attempt);
      });
    }

    var retakeBtn = $('#retakeQuizBtn');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', function() {
        if (!currentQuiz) return;
        qIdx = 0;
        selections = new Array(currentQuiz.questions.length);
        for (var i = 0; i < selections.length; i++) selections[i] = null;
        renderQuestion();
        switchPage('takePage');
      });
    }
  }

  /* ----------------------------- Confetti ----------------------------- */
  function launchConfetti() {
    var container = $('#confettiContainer');
    if (!container) return;
    container.innerHTML = '';
    container.classList.remove('hidden');
    var colors = ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F', '#DB4545'];
    var pieces = 80;
    var w = window.innerWidth;
    for (var i = 0; i < pieces; i++) {
      var piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.left = Math.random() * w + 'px';
      piece.style.animationDelay = Math.random() * 2 + 's';
      piece.style.opacity = 0.3 + Math.random() * 0.7;
      container.appendChild(piece);
    }
    setTimeout(function() { container.classList.add('hidden'); }, 4000);
  }

  /* ------------------------------ Results ------------------------------ */
  var scoreChart;
  function showResults(attempt) {
    var total = currentQuiz.questions.length;
    var percent = Math.round((attempt.score / total) * 100);
    var scoreDisplay = $('#scoreDisplay');
    if (scoreDisplay) {
      scoreDisplay.innerHTML = '<h2>' + attempt.score + ' / ' + total + '</h2><p>' + percent + '% correct</p>';
    }

    if (percent >= 80) launchConfetti();

    if (scoreChart) scoreChart.destroy();
    var ctx = $('#scoreChart');
    if (ctx && typeof Chart !== 'undefined') {
      scoreChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Correct', 'Wrong'],
          datasets: [{
            data: [attempt.score, total - attempt.score],
            backgroundColor: ['#1FB8CD', '#DB4545'],
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          cutout: '70%',
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }

    var reviewContainer = $('#answersReview');
    if (reviewContainer) {
      reviewContainer.innerHTML = '';
      for (var i = 0; i < currentQuiz.questions.length; i++) {
        var q = currentQuiz.questions[i];
        var correct = q.correctAnswer === attempt.answers[i];
        var ansIdx = attempt.answers[i];
        var yourAnswer = ansIdx !== null && ansIdx !== undefined ? (letters[ansIdx] + '. ' + q.options[ansIdx]) : '—';
        var card = document.createElement('div');
        card.className = 'answer-review-card ' + (correct ? 'correct' : 'incorrect');
        card.innerHTML = '<h4>Q' + (i + 1) + '. ' + q.question + '</h4><p><strong>Your answer:</strong> ' + yourAnswer + '</p><p><strong>Correct answer:</strong> ' + letters[q.correctAnswer] + '. ' + q.options[q.correctAnswer] + '</p>';
        reviewContainer.appendChild(card);
      }
    }

    switchPage('resultsPage');
  }

  /* ------------------------------ Profile ------------------------------ */
  function loadProfile() {
    if (!currentUser) return;
    var usernameEl = $('#profileUsername');
    var emailEl = $('#profileEmail');
    var dateEl = $('#profileJoinDate');
    if (usernameEl) usernameEl.textContent = currentUser.username;
    if (emailEl) emailEl.textContent = currentUser.email;
    if (dateEl) dateEl.textContent = new Date(currentUser.createdAt).toLocaleDateString();
    var myQuizzes = [];
    for (var i = 0; i < quizzes.length; i++) {
      if (quizzes[i].creatorId === currentUser.id) {
        myQuizzes.push(quizzes[i]);
      }
    }
    renderQuizGrid(myQuizzes, $('#myQuizzesGrid'));
  }

  /* ----------------------------- Event Setup ----------------------------- */
  function bindEvents() {
    var loginBtn = $('#loginBtn');
    var registerBtn = $('#registerBtn');
    var closeBtn = $('#authModalClose');
    var switchToRegBtn = $('#switchToRegister');
    var switchToLoginBtn = $('#switchToLogin');

    if (loginBtn) loginBtn.addEventListener('click', function() { openAuthModal('login'); });
    if (registerBtn) registerBtn.addEventListener('click', function() { openAuthModal('register'); });
    if (closeBtn) closeBtn.addEventListener('click', closeAuthModal);
    if (switchToRegBtn) switchToRegBtn.addEventListener('click', function(e) { e.preventDefault(); openAuthModal('register'); });
    if (switchToLoginBtn) switchToLoginBtn.addEventListener('click', function(e) { e.preventDefault(); openAuthModal('login'); });

    var loginForm = $('#loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var uEl = $('#loginUsername');
        var pEl = $('#loginPassword');
        if (!uEl || !pEl) return;
        var u = uEl.value.trim();
        var p = pEl.value;
        var user = null;
        for (var i = 0; i < users.length; i++) {
          if (users[i].username === u && users[i].password === p) {
            user = users[i];
            break;
          }
        }
        if (!user) {
          showToast('Invalid credentials', 'error');
          return;
        }
        currentUser = user;
        updateAuthUI();
        closeAuthModal();
        showToast('Welcome ' + u, 'success');
        renderQuizGrid(quizzes, $('#quizGrid'));
        switchPage('browsePage');
      });
    }

    var registerForm = $('#registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var uEl = $('#registerUsername');
        var emailEl = $('#registerEmail');
        var pEl = $('#registerPassword');
        if (!uEl || !emailEl || !pEl) return;
        var u = uEl.value.trim();
        var email = emailEl.value.trim();
        var p = pEl.value;
        var exists = false;
        for (var i = 0; i < users.length; i++) {
          if (users[i].username === u) {
            exists = true;
            break;
          }
        }
        if (exists) {
          showToast('Username exists', 'error');
          return;
        }
        var user = {
          id: genId(users),
          username: u,
          email: email,
          password: p,
          createdAt: new Date().toISOString()
        };
        users.push(user);
        currentUser = user;
        updateAuthUI();
        closeAuthModal();
        showToast('Registered successfully', 'success');
        renderQuizGrid(quizzes, $('#quizGrid'));
        switchPage('browsePage');
      });
    }

    var logoutBtn = $('#logoutBtn');
    var logoutBtnMobile = $('#logoutBtnMobile');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        currentUser = null;
        updateAuthUI();
        switchPage('homePage');
        showToast('Logged out', 'info');
      });
    }
    if (logoutBtnMobile) {
      logoutBtnMobile.addEventListener('click', function() {
        currentUser = null;
        updateAuthUI();
        switchPage('homePage');
        showToast('Logged out', 'info');
      });
    }

    var mobileToggle = $('#mobileMenuToggle');
    if (mobileToggle) {
      mobileToggle.addEventListener('click', function() {
        var nav = $('#mobileNav');
        if (nav) nav.classList.toggle('hidden');
      });
    }

    var mobileNav = $('#mobileNav');
    if (mobileNav) {
      mobileNav.addEventListener('click', function(e) {
        var btn = e.target.closest('button');
        if (!btn) return;
        var action = btn.dataset.action;
        if (action === 'login') openAuthModal('login');
        if (action === 'register') openAuthModal('register');
      });
    }

    var heroCreateBtn = $('#heroCreateQuiz');
    var heroTakeBtn = $('#heroTakeQuiz');
    if (heroCreateBtn) {
      heroCreateBtn.addEventListener('click', function() {
        if (!currentUser) {
          openAuthModal('login');
          return;
        }
        switchPage('createPage');
      });
    }
    if (heroTakeBtn) {
      heroTakeBtn.addEventListener('click', function() {
        if (!currentUser) {
          openAuthModal('login');
          return;
        }
        renderQuizGrid(quizzes, $('#quizGrid'));
        switchPage('browsePage');
      });
    }

    var navLinks = $$('.nav-link');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function(e) {
        e.preventDefault();
        var pg = this.dataset.page;
        if (this.classList.contains('auth-required') && !currentUser) {
          openAuthModal('login');
          return;
        }
        if (pg === 'browse') renderQuizGrid(quizzes, $('#quizGrid'));
        if (pg === 'profile') loadProfile();
        switchPage(pg + 'Page');
      });
    }

    var logo = $('.logo');
    if (logo) {
      logo.addEventListener('click', function() {
        switchPage('homePage');
      });
    }
  }

  /* -------------------------------- Init -------------------------------- */
  function init() {
    updateAuthUI();
    bindEvents();
    renderQuizGrid(quizzes, $('#quizGrid'));
    setupQuizCreation();
    setupQuizTaking();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
