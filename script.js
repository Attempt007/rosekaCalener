// script.js

document.addEventListener("DOMContentLoaded", () => {
    const monthYear = document.getElementById('month-year');
    const daysContainer = document.getElementById('days');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const heartContainer = document.getElementById('heartContainer');
    
    let currentDate = new Date();
    const today = new Date();

    const specialDates = {
        startOfTerm: [
            { year: 2024, month: 7, day: 8, description: 'Start of the term' },
            { year: 2024, month: 10, day: 12, description: 'Start of the term' },
            { year: 2025, month: 1, day: 25, description: 'Start of the term' },
        ],
        endOfTerm: [
            { year: 2024, month: 10, day: 8, description: 'End of the term' },
            { year: 2025, month: 1, day: 21, description: 'End of the term' },
            { year: 2025, month: 4, day: 30, description: 'End of the term' },
        ],
        parentTeacherMeeting: [
            { year: 2024, month: 7, day: 7, description: 'Parent-Teacher Meeting' },
            { year: 2024, month: 10, day: 9, description: 'Parent-Teacher Meeting' },
            { year: 2025, month: 1, day: 22, description: 'Parent-Teacher Meeting' },
            { year: 2025, month: 4, day: 23, description: 'Parent-Teacher Meeting' },
            { year: 2025, month: 4, day: 24, description: 'Parent-Teacher Meeting' },
        ],
        teacherDevelopmentDay: [
            { year: 2024, month: 7, day: 1, description: 'Teacher Development Day' },
            { year: 2024, month: 7, day: 2, description: 'Teacher Development Day' },
            { year: 2024, month: 7, day: 5, description: 'Teacher Development Day' },
            { year: 2024, month: 7, day: 6, description: 'Teacher Development Day' },
            { year: 2024, month: 10, day: 11, description: 'Teacher Development Day' },
            { year: 2025, month: 1, day: 24, description: 'Teacher Development Day' },
        ],
        holiday: [
            // The dates here should be adjusted as per correct holiday dates.
            { year: 2024, month: 8, day: 24, description: 'Holiday: Constitutional Day' },
            { year: 2024, month: 9, day: 1, description: 'Holiday: Pchum Ben Break' },
            { year: 2024, month: 9, day: 2, description: 'Holiday: Pchum Ben Break' },
            { year: 2024, month: 9, day: 3, description: 'Holiday: Pchum Ben Break' },
            { year: 2024, month: 9, day: 4, description: 'Holiday: Pchum Ben Break' },
            { year: 2024, month: 9, day: 15, description: "Holiday: King's Father Day" },
            { year: 2024, month: 9, day: 29, description: "Holiday: King's Coronation Day" },
            { year: 2024, month: 10, day: 14, description: 'Holiday: Water Fastival Ceremony' },
            { year: 2024, month: 10, day: 15, description: 'Holiday: Water Fastival Ceremony' },
            { year: 2024, month: 11, day: 23, description: 'Winter Break' },
            { year: 2024, month: 11, day: 24, description: 'Winter Break' },
            { year: 2024, month: 11, day: 25, description: 'Winter Break' },
            { year: 2024, month: 11, day: 26, description: 'Winter Break' },
            { year: 2024, month: 11, day: 27, description: 'Winter Break' },
            { year: 2024, month: 11, day: 30, description: 'Winter Break' },
            { year: 2024, month: 11, day: 31, description: 'Winter Break' },
            { year: 2025, month: 0, day: 1, description: 'Winter Break' },
            { year: 2025, month: 0, day: 2, description: 'Winter Break' },
            { year: 2025, month: 0, day: 3, description: 'Winter Break' },
            { year: 2025, month: 0, day: 7, description: 'Victory Day' },
            { year: 2025, month: 3, day: 14, description: 'Khmer New Year' },
            { year: 2025, month: 3, day: 15, description: 'Khmer New Year' },
            { year: 2025, month: 3, day: 16, description: 'Khmer New Year' },
            { year: 2025, month: 3, day: 17, description: 'Khmer New Year' },
            { year: 2025, month: 3, day: 18, description: 'Khmer New Year' },
            { year: 2025, month: 4, day: 1, description: 'Internation Labor Day' },
            { year: 2025, month: 4, day: 14, description: "King's Birthday" },
            { year: 2025, month: 4, day: 15, description: 'Royal Plowing Ceremony' },
            
        ],
        graduationCeremonies: [
            { year: 2025, month: 4, day: 31, description: 'Graduation Ceremony' },
        ],
    };
    
    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;
        daysContainer.innerHTML = '';

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'date empty';
            daysContainer.appendChild(emptyCell);
        }

        for (let i = 1; i <= lastDate; i++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'date';
            dayCell.textContent = i;

            const currentDay = new Date(year, month, i).getDay();
            if (currentDay === 0) {
                dayCell.style.color = 'red';
            }

            if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
                dayCell.classList.add('today');
            }

            addSpecialDateClassAndListener(dayCell, year, month, i, specialDates.startOfTerm, 'start-of-term');
            addSpecialDateClassAndListener(dayCell, year, month, i, specialDates.endOfTerm, 'end-of-term');
            addSpecialDateClassAndListener(dayCell, year, month, i, specialDates.parentTeacherMeeting, 'parent-teacher-meeting');
            addSpecialDateClassAndListener(dayCell, year, month, i, specialDates.teacherDevelopmentDay, 'teacher-development-day');
            addSpecialDateClassAndListener(dayCell, year, month, i, specialDates.holiday, 'holiday');
            addSpecialDateClassAndListener(dayCell, year, month, i, specialDates.graduationCeremonies, 'graduation-ceremonies');
            
            daysContainer.appendChild(dayCell);
        }
    }

    function isSpecialDate(year, month, day, datesArray) {
        return datesArray.find(date => date.year === year && date.month === month && date.day === day);
    }

    function addSpecialDateClassAndListener(dayCell, year, month, day, datesArray, className) {
        const specialDate = isSpecialDate(year, month, day, datesArray);
        if (specialDate) {
            dayCell.classList.add(className);
            dayCell.addEventListener('click', () => showPopup(specialDate.description));
        }
    }

    function showPopup(description) {
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.textContent = description;
        
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', () => popup.remove());
        popup.appendChild(closeButton);
        
        document.body.appendChild(popup);
    }

    function changeMonth(offset) {
        currentDate.setMonth(currentDate.getMonth() + offset);
        renderCalendar(currentDate);
    }

    function createHearts(event) {
        heartContainer.innerHTML = ''; // Clear previous hearts

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        for (let i = 0; i < 300; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerText = '❤';

            const startX = Math.random() * viewportWidth;
            const startY = Math.random() * viewportHeight;
            heart.style.left = `${startX}px`;
            heart.style.top = `${startY}px`;

            const size = Math.random() * 15 + 10;
            heart.style.fontSize = `${size}px`;
            heart.style.animation = `fly ${Math.random() * 3 + 2}s linear`;
            heart.style.animationDelay = `${Math.random() * 2}s`;

            heart.addEventListener('animationend', () => heart.remove());

            heartContainer.appendChild(heart);
        }
    }

    document.addEventListener('dblclick', createHearts);

    renderCalendar(currentDate);

    prevMonthBtn.addEventListener('click', () => changeMonth(-1));
    nextMonthBtn.addEventListener('click', () => changeMonth(1));
});
