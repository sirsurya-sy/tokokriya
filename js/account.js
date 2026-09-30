function getUsers() {
  return storageGet(KEYS.users, []);
}

function getCurrentUser() {
  const id = storageGet(KEYS.session, null);
  return id ? getUsers().find((user) => user.id === id) || null : null;
}

function isAuthenticated() {
  return Boolean(getCurrentUser());
}

function loginUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = getUsers().find((item) => item.email === normalizedEmail && item.password === password);
  if (!user) return { ok: false, message: "Email atau password salah." };
  storageSet(KEYS.session, user.id);
  return { ok: true, user };
}

function registerUser({ firstName, lastName, email, phone, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  if (getUsers().some((user) => user.email === normalizedEmail)) {
    return { ok: false, message: "Email sudah terdaftar." };
  }
  const user = {
    id: uid("user"),
    email: normalizedEmail,
    password,
    profile: createProfile(firstName.trim(), lastName.trim(), normalizedEmail, phone.trim())
  };
  storageSet(KEYS.users, [...getUsers(), user]);
  storageSet(KEYS.session, user.id);
  return { ok: true, user };
}

function userStorageKey(key) {
  const user = getCurrentUser();
  return `${key}:${user ? user.id : "guest"}`;
}

function createProfile(firstName, lastName, email, phone) {
  return { firstName, lastName, email, phone, avatar: "" };
}

function getProfile() {
  const user = getCurrentUser();
  if (!user) return null;
  return { ...user.profile, ...storageGet(userStorageKey(KEYS.profile), {}) };
}

function saveProfile(data) {
  const user = getCurrentUser();
  if (!user) return false;
  const profile = { ...getProfile(), ...data };
  const users = getUsers().map((item) => (item.id === user.id ? { ...item, profile, email: profile.email } : item));
  storageSet(KEYS.users, users);
  storageSet(userStorageKey(KEYS.profile), profile);
  return true;
}

function getAddresses() {
  return isAuthenticated() ? storageGet(userStorageKey(KEYS.addresses), []) : [];
}

function saveAddresses(list) {
  if (isAuthenticated()) storageSet(userStorageKey(KEYS.addresses), list);
}

function getPayments() {
  return isAuthenticated() ? storageGet(userStorageKey(KEYS.payments), []) : [];
}

function savePayments(list) {
  if (isAuthenticated()) storageSet(userStorageKey(KEYS.payments), list);
}

function getSettings() {
  return {
    emailNotif: true,
    marketing: false,
    orderUpdates: true,
    language: "id",
    privacyShare: false,
    ...(isAuthenticated() ? storageGet(userStorageKey(KEYS.settings), {}) : {})
  };
}

function saveSettings(data) {
  if (isAuthenticated()) storageSet(userStorageKey(KEYS.settings), { ...getSettings(), ...data });
}

function getNotifications() {
  return isAuthenticated() ? storageGet(userStorageKey(KEYS.notifications), []) : [];
}

function saveNotifications(list) {
  if (isAuthenticated()) storageSet(userStorageKey(KEYS.notifications), list);
}

function unreadCount() {
  return getNotifications().filter((n) => !n.read).length;
}

function getOrders() {
  return isAuthenticated() ? storageGet(userStorageKey(KEYS.orders), []) : [];
}

function saveOrders(list) {
  if (isAuthenticated()) storageSet(userStorageKey(KEYS.orders), list);
}

function getOrder(id) {
  return getOrders().find((o) => o.id === id);
}

function logoutDemo() {
  clearPendingAuthAction();
  localStorage.removeItem(userStorageKey(KEYS.checkout));
  localStorage.removeItem(userStorageKey(KEYS.checkoutReturn));
  localStorage.removeItem(KEYS.session);
  showToast("You have been logged out.");
  location.href = "index.html";
}
