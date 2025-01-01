const ranks = [
    { id: "Donator", price: 7.50 },
    { id: "VIP", price: 5.50 },
    { id: "VIP+", price: 6.50 },
    { id: "MVP", price: 0.50 },
    { id: "MVP+", price: 2.50 },
    { id: "MVP++", price: 4.50 },
    { id: "Elite", price: 8.50 }
];

let currentUser = localStorage.getItem("currentUser");
let users = JSON.parse(localStorage.getItem("users")) || {};

if (!currentUser || !users[currentUser]) {
    alert('Bitte zuerst anmelden!');
    window.location.href = "login.html";
}

function renderShop() {
    ranks.forEach(rank => {
        const button = document.querySelector(`button[onclick*="${rank.id}"]`);
        const currentRankIndex = ranks.findIndex(r => r.id === users[currentUser].rank);
        const rankIndex = ranks.findIndex(r => r.id === rank.id);

        if (rankIndex !== currentRankIndex + 1 && rankIndex > 0) {
            button.disabled = true;
            button.style.opacity = "0.5";
            button.style.pointerEvents = "none";
        } else {
            button.disabled = false;
            button.style.opacity = "1";
            button.style.pointerEvents = "auto";
        }
    });
}

function addToCart(rank, price) {
    const currentRankIndex = ranks.findIndex(r => r.id === users[currentUser].rank);
    const rankIndex = ranks.findIndex(r => r.id === rank);

    if (rankIndex !== currentRankIndex + 1 && rankIndex > 0) {
        alert('Du musst zuerst den vorherigen Rang kaufen!');
        return;
    }

    users[currentUser].rank = rank;
    localStorage.setItem("users", JSON.stringify(users));

    alert(`${rank} wurde gekauft!`);
    renderShop();
}

document.addEventListener("DOMContentLoaded", () => {
    if (!users[currentUser].rank) {
        users[currentUser].rank = null;
        localStorage.setItem("users", JSON.stringify(users));
    }
    renderShop();
});