// ================= CONFIGURATION =================
const birthdayMessage = "Happy Birthday, Ramya 🩵\n\nYou are not just a beautiful chapter in my life, you are a feeling that made every ordinary day meaningful. From your smile to your care, everything about you felt like a quiet miracle.\n\nOn your special day, I just want you to know that you are deeply cherished and always remembered in my heart. I hope you have chosen a good person and a good path in life—stay happy, stay strong in whatever you have chosen 😊.\n\nMay this year give you peace, growth, and all the happiness you truly deserve. 🌸✨";

let typewriterIndex = 0;
let typingTimeout;

// ================= NAVIGATION =================
function showDashboard() {
    document.getElementById("spline-section").classList.add("hide");
    document.getElementById("dashboard-section").classList.add("show");
}

// ================= BIRTHDAY WISHES (AUDIO + TYPEWRITER) =================
function openWishes() {
    const modal = document.getElementById("wishes-modal");
    const song = document.getElementById("birthday-song");
    const replayContainer = document.getElementById("replay-container");
    
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("active"), 10);

    if (replayContainer) {
        replayContainer.style.display = "block"; 
    }

    // 1. Audio Logic: Jump to 8 seconds and play
    if (song) {
        song.currentTime = 6;
        song.play().catch(err => console.log("User interaction needed for audio"));
    }

    // 2. Start Typewriter/Spline Restart
    replayWishes();

    // 3. Force Spline to resize
    window.dispatchEvent(new Event('resize'));
}

function replayWishes() {
    const textContainer = document.getElementById("typewriter-text");
    const wishesIframe = document.getElementById("wishes-iframe");
    
    // Reset Spline
    if (wishesIframe) {
        const currentSrc = wishesIframe.src;
        wishesIframe.src = ""; 
        wishesIframe.src = currentSrc; 
    }

    // Reset Typewriter
    clearTimeout(typingTimeout);
    if (textContainer) {
        textContainer.innerHTML = "";
        typewriterIndex = 0;
        typeWriterEffect();
    }
}

function typeWriterEffect() {
    const textContainer = document.getElementById("typewriter-text");
    if (typewriterIndex < birthdayMessage.length) {
        let char = birthdayMessage.charAt(typewriterIndex);
        
        // This handles the \n line breaks properly in the typewriter
        textContainer.innerHTML += char === "\n" ? "<br>" : char;
        
        typewriterIndex++;
        typingTimeout = setTimeout(typeWriterEffect, 50); 
    }
}

function closeWishes() {
    const modal = document.getElementById("wishes-modal");
    const song = document.getElementById("birthday-song");

    modal.classList.remove("active");
    setTimeout(() => { modal.style.display = "none"; }, 400);

    if (song) song.pause();
    clearTimeout(typingTimeout);
}

// ================= MEMORIES LOGIC =================
function openMemories() {
    const modal = document.getElementById("memories-modal");
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("active"), 10);
    backToGrid();
}

function closeMemories() {
    const modal = document.getElementById("memories-modal");
    modal.classList.remove("active");
    setTimeout(() => (modal.style.display = "none"), 400);
}

function showPhotoDetail(imgSrc, title, desc) {
    document.getElementById("memory-grid-view").style.display = "none";
    document.getElementById("memory-detail-view").style.display = "block";
    document.getElementById("focused-img").src = imgSrc;
    document.getElementById("photo-title").innerText = title;
    document.getElementById("photo-desc").innerText = desc;
}

function backToGrid() {
    document.getElementById("memory-grid-view").style.display = "block";
    document.getElementById("memory-detail-view").style.display = "none";
}

// Universal Close for Letter/Gift/General clicks
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
        setTimeout(() => { modal.style.display = 'none'; }, 400);
    });
}

// Close modals when clicking outside the content
window.onclick = function(event) {
    const wishesModal = document.getElementById("wishes-modal");
    const memoriesModal = document.getElementById("memories-modal");
    const letterModal = document.getElementById("letter-modal");
    const giftModal = document.getElementById("gift-modal");

    if (event.target == wishesModal) closeWishes();
    if (event.target == memoriesModal) closeMemories();
    if (event.target == letterModal || event.target == giftModal) closeModal();
}
// OPEN LETTER MODAL
function openletter() {
    const modal = document.getElementById("letter-modal");
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("active"), 10);
}

// TOGGLE PLAY / PAUSE
function toggleLetterAudio() {
    const audio = document.getElementById("letter-audio");
    const btn = document.getElementById("play-pause-btn");
    
    if (audio.paused) {
        audio.play().catch(err => console.error("Audio play failed:", err));
        btn.innerHTML = "⏸";
    } else {
        audio.pause();
        btn.innerHTML = "▶";
    }
}

// PROGRESS BAR & TIME UPDATE
const letterAudio = document.getElementById("letter-audio");
if (letterAudio) {
    letterAudio.ontimeupdate = function() {
        const fill = document.getElementById("progress-fill-mini");
        const timeDisplay = document.getElementById("current-time-mini");
        
        if (letterAudio.duration) {
            // Update bar width
            let progress = (letterAudio.currentTime / letterAudio.duration) * 100;
            if (fill) fill.style.width = progress + "%";
            
            // Update time text (00:00)
            let mins = Math.floor(letterAudio.currentTime / 60);
            let secs = Math.floor(letterAudio.currentTime % 60);
            if (timeDisplay) {
                timeDisplay.innerText = `${mins}:${secs.toString().padStart(2, '0')}`;
            }
        }
    };

    // Auto-reset button when audio ends
    letterAudio.onended = function() {
        document.getElementById("play-pause-btn").innerHTML = "▶";
        document.getElementById("progress-fill-mini").style.width = "0%";
    };
}

// CLOSE MODAL & STOP AUDIO
function closeLetter() {
    const modal = document.getElementById("letter-modal");
    const audio = document.getElementById("letter-audio");
    const btn = document.getElementById("play-pause-btn");

    // Stop audio immediately
    if (audio) {
        audio.pause();
        audio.currentTime = 0; // Optional: reset to start
    }
    
    // Reset button icon
    if (btn) btn.innerHTML = "▶";

    // Close animation
    modal.classList.remove("active");
    setTimeout(() => { 
        modal.style.display = "none"; 
    }, 400);
}
function openGift() {
    const modal = document.getElementById("gift-modal");
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("active"), 10);
}
