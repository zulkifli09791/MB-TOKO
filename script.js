// script.js

// Toggle menu responsif
function toggleMenu() {
  const nav = document.querySelector('nav ul');
  nav.classList.toggle('show');
}

// Tambahkan ke keranjang
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = {
    id: productId,
    name: "Produk " + productId,
    price: 25000,
    quantity: 1
  };

  const index = cart.findIndex(p => p.id === productId);
  if (index > -1) {
    cart[index].quantity += 1;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produk ditambahkan ke keranjang!");
}

// Tampilkan isi keranjang
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("total-price");
  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <p>${item.name}</p>
      <p>Rp ${item.price.toLocaleString()}</p>
      <p>Jumlah: ${item.quantity}</p>
      <button onclick="removeFromCart(${item.id})">Hapus</button>
    `;
    container.appendChild(itemDiv);
    total += item.price * item.quantity;
  });

  totalDisplay.textContent = `Total: Rp ${total.toLocaleString()}`;
}

// Hapus produk dari keranjang
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Proses checkout
function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  const riwayat = JSON.parse(localStorage.getItem("riwayat")) || [];
  const tanggal = new Date().toLocaleString();
  riwayat.push({ tanggal, items: cart });
  localStorage.setItem("riwayat", JSON.stringify(riwayat));

  localStorage.removeItem("cart");
  alert("Pesanan berhasil! Riwayat telah disimpan.");
  window.location.href = "riwayat.html";
}

// Tampilkan riwayat pesanan
function loadRiwayat() {
  const riwayat = JSON.parse(localStorage.getItem("riwayat")) || [];
  const container = document.getElementById("riwayat-container");
  container.innerHTML = "";

  if (riwayat.length === 0) {
    container.innerHTML = "<p>Tidak ada riwayat pesanan.</p>";
    return;
  }

  riwayat.forEach((pesanan, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "riwayat-item";
    itemDiv.innerHTML = `<h4>Pesanan ${index + 1} - ${pesanan.tanggal}</h4>`;
    
    pesanan.items.forEach(item => {
      itemDiv.innerHTML += `<p>${item.name} x ${item.quantity} - Rp ${(item.price * item.quantity).toLocaleString()}</p>`;
    });

    container.appendChild(itemDiv);
  });
}

// Login sederhana (simulasi)
function loginUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin") {
    localStorage.setItem("loggedIn", "true");
    alert("Login berhasil!");
    window.location.href = "index.html";
  } else {
    alert("Username atau password salah!");
  }
}

function checkLogin() {
  const status = localStorage.getItem("loggedIn");
  if (status !== "true") {
    alert("Silakan login terlebih dahulu.");
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  alert("Berhasil logout.");
  window.location.href = "login.html";
}
