const STORE = {
  name: "TokoKriya",
  city: "Sidoarjo",
  email: "hello@tokokriya.id",
  phone: "+62 31 8945 2200",
  address: "Jl. Gubernur Suryo No. 18, Sidoarjo, Jawa Timur 61219",
  hours: "Senin–Sabtu, 09.00–21.00 WIB",
  freeShippingMin: 500000,
  coupons: {
    KRIYA10: { type: "percent", value: 10, label: "10% off" },
    WELCOME15: { type: "percent", value: 15, label: "15% off" },
    FREESHIP: { type: "shipping", value: 0, label: "Free shipping" }
  }
};

const CATEGORIES = ["Kulit Tanggulangin", "Batik Jetis", "Anyaman", "Perhiasan", "Dekorasi"];

const DELIVERY_OPTIONS = [
  { id: "jne", name: "JNE Regular", eta: "3–5 hari", price: 27000 },
  { id: "jnt", name: "J&T Express", eta: "2–4 hari", price: 35000 },
  { id: "sicepat", name: "SiCepat", eta: "2–3 hari", price: 32000 }
];

const PAYMENT_OPTIONS = [
  { id: "bank", name: "Bank Transfer", hint: "BCA / Mandiri / BRI" },
  { id: "ovo", name: "OVO", hint: "E-wallet" },
  { id: "gopay", name: "GoPay", hint: "E-wallet" },
  { id: "card", name: "Credit Card", hint: "Visa / Mastercard" },
  { id: "cod", name: "COD", hint: "Bayar di tempat" }
];

const U = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const L = (file) => `assets/products/${file}`;

const PRODUCTS = [
  {
    id: "p01", slug: "tas-kulit-tanggulangin", name: "Tas Kulit Tanggulangin", category: "Kulit Tanggulangin",
    brand: "Tanggulangin Craft", price: 499000, oldPrice: 599000, discount: 17, rating: 4.8, reviewCount: 124,
    stock: 14, stockStatus: "In Stock", colors: ["Coklat", "Hitam"], sizes: [],
    description: "Tas tangan kulit sapi asli buatan pengrajin Tanggulangin Sidoarjo. Jahitan tangan rapi, hardware kuningan, dan interior luas. Cocok untuk kerja maupun acara formal.",
    images: [L("tas-kulit-tanggulangin.jpg"), L("tas-kulit-hitam.jpg"), L("tas-kulit-coklat-2.jpg")],
    badge: "-17%", featured: true, bestSeller: true, newArrival: false,
    details: { material: "Kulit sapi asli full-grain", dimensions: "28 x 20 x 12 cm" }
  },
  {
    id: "p02", slug: "sandal-kulit-tanggulangin", name: "Sandal Kulit Tanggulangin", category: "Kulit Tanggulangin",
    brand: "Tanggulangin Craft", price: 379000, oldPrice: 450000, discount: 16, rating: 4.7, reviewCount: 96,
    stock: 22, stockStatus: "In Stock", colors: ["Coklat", "Tan"], sizes: ["38", "39", "40", "41", "42", "43"],
    description: "Sandal kulit sapi asli handmade dari Tanggulangin. Lapisan dalam kulit lembut, sol karet tebal antislip. Nyaman dipakai sepanjang hari.",
    images: [L("sandal-kulit-tanggulangin.jpg")],
    badge: "-16%", featured: true, bestSeller: true, newArrival: true,
    details: { material: "Kulit sapi full-grain", sole: "Karet tebal antislip" }
  },
  {
    id: "p03", slug: "tas-selempang-kulit", name: "Tas Selempang Kulit", category: "Kulit Tanggulangin",
    brand: "Tanggulangin Craft", price: 209000, oldPrice: 280000, discount: 25, rating: 4.9, reviewCount: 210,
    stock: 30, stockStatus: "In Stock", colors: ["Coklat", "Hitam"], sizes: [],
    description: "Tas selempang kulit sapi asli dengan tali adjustable dan satu kantong depan. Ringan dan praktis untuk aktivitas harian.",
    images: [L("tas-selempang-kulit.jpg")], catalogVisible: false,
    badge: "-25%", featured: true, bestSeller: true, newArrival: false,
    details: { material: "Kulit sapi asli", dimensions: "20 x 15 x 6 cm" }
  },
  {
    id: "p04", slug: "dompet-kulit-tanggulangin", name: "Dompet Kulit Handmade Tanggulangin", category: "Kulit Tanggulangin",
    brand: "Tanggulangin Craft", price: 449000, oldPrice: 550000, discount: 18, rating: 4.9, reviewCount: 165,
    stock: 11, stockStatus: "In Stock", colors: ["Tan", "Coklat Tua"], sizes: [],
    description: "Dompet lipat kulit buatan tangan dengan beberapa slot kartu dan kompartemen uang.",
    images: [L("dompet-kulit-handmade-unsplash.jpg")],
    imageCredit: {
      source: "Two Paddles Axe and Leatherwork / Unsplash",
      sourceUrl: "https://unsplash.com/photos/brown-leather-bifold-wallet-on-table-na8l3EPqpvY",
      license: "Unsplash License",
      licenseUrl: "https://unsplash.com/license",
      changes: "diubah ukuran"
    },
    badge: "-18%", featured: true, bestSeller: true, newArrival: false,
    details: { material: "Kulit sapi full-grain", slots: "8 slot kartu" }
  },
  {
    id: "p05", slug: "tas-ransel-kulit", name: "Tas Ransel Kulit Artisan", category: "Kulit Tanggulangin",
    brand: "Tanggulangin Craft", price: 699000, oldPrice: 850000, discount: 18, rating: 4.8, reviewCount: 42,
    stock: 9, stockStatus: "In Stock", colors: ["Coklat Tua", "Hitam"], sizes: [],
    description: "Tas ransel kulit sapi handmade dengan banyak kompartemen dan hardware kuningan. Tahan lama untuk kerja dan travel.",
    images: [L("tas-ransel-kulit.jpg")], catalogVisible: false,
    badge: "JUST IN", featured: true, bestSeller: false, newArrival: true,
    details: { material: "Kulit crazy horse asli", laptop: "Slot laptop 14 inci" }
  },
  {
    id: "p06", slug: "sandal-anyaman-pandan", name: "Sandal Anyaman Pandan", category: "Anyaman",
    brand: "Kriya Anyam", price: 349000, oldPrice: 420000, discount: 17, rating: 4.6, reviewCount: 88,
    stock: 18, stockStatus: "In Stock", colors: ["Natural", "Coklat"], sizes: ["38", "39", "40", "41", "42"],
    description: "Sandal anyaman daun pandan handmade khas Sidoarjo. Sol kulit tipis, anyaman kuat, ringan dan sejuk dipakai.",
    images: [L("sandal-anyaman-pandan.jpg")], catalogVisible: false,
    badge: "-17%", featured: false, bestSeller: false, newArrival: true,
    details: { material: "Daun pandan & kulit sapi" }
  },
  {
    id: "p07", slug: "tas-batik-jetis", name: "Tas Batik Jetis Selempang", category: "Batik Jetis",
    brand: "Batik Jetis Studio", price: 259000, oldPrice: 320000, discount: 19, rating: 4.7, reviewCount: 94,
    stock: 16, stockStatus: "In Stock", colors: ["Hitam-Merah", "Coklat-Krem"], sizes: [],
    description: "Tas selempang dari kain batik tulis Jetis Sidoarjo bermotif bunga klasik. Kombinasi kulit asli dan batik tradisional.",
    images: [L("tas-batik-jetis.jpg"), L("tas-tote-batik.jpg")],
    badge: "JUST IN", featured: true, bestSeller: false, newArrival: true,
    details: { material: "Batik tulis Jetis & kulit sapi", motif: "Kembang Setaman" }
  },
  {
    id: "p08", slug: "topi-batik-jetis", name: "Topi Batik Jetis", category: "Batik Jetis",
    brand: "Batik Jetis Studio", price: 149000, oldPrice: 189000, discount: 21, rating: 4.9, reviewCount: 112,
    stock: 40, stockStatus: "In Stock", colors: ["Hitam", "Coklat"], sizes: ["One Size"],
    description: "Topi baseball bermotif batik Jetis Sidoarjo. Bahan katun batik cap, dapat disesuaikan ukurannya.",
    images: [L("topi-batik.jpg")], catalogVisible: false,
    badge: "JUST IN", featured: false, bestSeller: false, newArrival: true,
    details: { material: "Katun batik cap Jetis" }
  },
  {
    id: "p09", slug: "tote-bag-batik", name: "Tote Bag Batik Jetis", category: "Batik Jetis",
    brand: "Batik Jetis Studio", price: 389000, oldPrice: 450000, discount: 14, rating: 4.6, reviewCount: 78,
    stock: 13, stockStatus: "In Stock", colors: ["Hitam-Merah", "Biru-Putih"], sizes: [],
    description: "Tote bag lebar dari kain batik tulis Jetis dengan pelapis kanvas. Handle kulit asli yang kuat untuk kebutuhan sehari-hari.",
    images: [L("tas-tote-batik.jpg")], catalogVisible: false,
    badge: "-14%", featured: false, bestSeller: true, newArrival: false,
    details: { material: "Batik tulis Jetis & kanvas" }
  },
  {
    id: "p10", slug: "kain-batik-jetis-tulis", name: "Kain Batik Jetis Tulis", category: "Batik Jetis",
    brand: "Batik Jetis Studio", price: 499000, oldPrice: 590000, discount: 15, rating: 4.8, reviewCount: 105,
    stock: 7, stockStatus: "In Stock", colors: ["Hitam-Merah", "Coklat-Krem"], sizes: ["2 meter", "3 meter"],
    description: "Kain batik tulis asli Jetis Sidoarjo. Motif kembang setaman dikerjakan tangan dengan canting dan malam. Cocok untuk kemeja, blus, atau dekorasi.",
    images: [L("kain-batik-jetis.jpg")], catalogVisible: false,
    badge: "-15%", featured: true, bestSeller: true, newArrival: true,
    details: { material: "Katun primissima", motif: "Kembang Setaman Jetis", teknik: "Batik tulis canting" }
  },
  {
    id: "p11", slug: "kain-batik-sekar-jagad", name: "Kain Batik Jetis Motif Sekar Jagad", category: "Batik Jetis",
    brand: "Batik Jetis Studio", price: 420000, oldPrice: 500000, discount: 16, rating: 4.9, reviewCount: 142,
    stock: 8, stockStatus: "In Stock", colors: ["Hitam", "Coklat"], sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Kain batik tulis Jetis bermotif Sekar Jagad, dibuat dengan teknik canting tradisional.",
    images: [L("kain-batik-jetis.jpg")],
    catalogVisible: false,
    badge: "-16%", featured: true, bestSeller: true, newArrival: true,
    details: { material: "Katun primissima", motif: "Sekar Jagad Jetis" }
  },
  {
    id: "p12", slug: "sepatu-kulit-tanggulangin", name: "Sepatu Kulit Derby Tanggulangin", category: "Kulit Tanggulangin",
    brand: "Tanggulangin Craft", price: 780000, oldPrice: 920000, discount: 15, rating: 4.8, reviewCount: 47,
    stock: 6, stockStatus: "In Stock", colors: ["Coklat Tua", "Hitam"], sizes: ["40", "41", "42", "43", "44"],
    description: "Sepatu derby kulit sapi asli buatan tangan pengrajin Tanggulangin. Detail brogue, sol kulit, dan finishing matte yang elegan.",
    images: [L("sepatu-kulit-tanggulangin.jpg")], catalogVisible: false,
    badge: "-15%", featured: false, bestSeller: false, newArrival: true,
    details: { material: "Kulit sapi full-grain", sole: "Sol kulit" }
  },
  {
    id: "p13", slug: "ikat-pinggang-kulit", name: "Ikat Pinggang Kulit Ukir", category: "Kulit Tanggulangin",
    brand: "Tanggulangin Craft", price: 249000, oldPrice: 310000, discount: 20, rating: 4.9, reviewCount: 54,
    stock: 5, stockStatus: "In Stock", colors: ["Coklat", "Hitam"], sizes: ["85", "90", "95", "100", "105"],
    description: "Ikat pinggang kulit sapi full-grain dengan ukiran motif flora khas Tanggulangin. Gesper logam antik kuningan tahan lama.",
    images: [L("ikat-pinggang-kulit-unsplash.jpg")],
    imageCredit: {
      source: "Fashion Needles / Unsplash",
      sourceUrl: "https://unsplash.com/photos/a-brown-leather-belt-is-shown-with-its-buckle-QySVrfX93EI",
      license: "Unsplash License",
      licenseUrl: "https://unsplash.com/license",
      changes: "diubah ukuran"
    },
    badge: "-20%", featured: true, bestSeller: true, newArrival: true,
    details: { material: "Kulit sapi full-grain", buckle: "Logam kuningan antik" }
  },
  {
    id: "p14", slug: "blus-batik-wanita", name: "Blus Batik Jetis Wanita", category: "Batik Jetis",
    brand: "Batik Jetis Studio", price: 350000, oldPrice: 420000, discount: 17, rating: 4.7, reviewCount: 69,
    stock: 20, stockStatus: "In Stock", colors: ["Hitam-Merah", "Biru-Coklat"], sizes: ["S", "M", "L", "XL"],
    description: "Blus wanita batik tulis Jetis Sidoarjo lengan panjang. Motif flora klasik dengan warna sogan khas Sidoarjo yang elegan.",
    images: [L("blus-batik-wanita.jpg")], catalogVisible: false,
    badge: "-17%", featured: false, bestSeller: true, newArrival: false,
    details: { material: "Katun primissima", motif: "Parang Kusumo" }
  },
  {
    id: "p15", slug: "sarung-batik-jetis", name: "Sarung Batik Jetis Tulis", category: "Batik Jetis",
    brand: "Batik Jetis Studio", price: 550000, oldPrice: 680000, discount: 19, rating: 4.9, reviewCount: 38,
    stock: 10, stockStatus: "In Stock", colors: ["Hitam-Merah", "Coklat-Krem"], sizes: ["One Size"],
    description: "Sarung batik tulis Jetis Sidoarjo untuk pria. Dibuat dengan canting oleh pengrajin berpengalaman. Motif kawung dan parang tradisional.",
    images: [L("sarung-batik.jpg")], catalogVisible: false,
    badge: "JUST IN", featured: true, bestSeller: false, newArrival: true,
    details: { material: "Katun primissima", teknik: "Batik tulis" }
  },
  {
    id: "p16", slug: "minyak-esensial-sidoarjo", name: "Minyak Esensial Herbal Sidoarjo", category: "Aromaterapi",
    brand: "Aura Nusantara", price: 189000, oldPrice: 230000, discount: 18, rating: 4.9, reviewCount: 118,
    stock: 15, stockStatus: "In Stock", colors: [], sizes: ["30ml", "60ml"],
    description: "Minyak esensial 100% alami dari tanaman herbal Jawa Timur. Aroma melati, kenanga, dan pandan yang menenangkan.",
    images: [L("minyak-aromaterapi.jpg")], catalogVisible: false,
    badge: "-18%", featured: true, bestSeller: true, newArrival: true,
    details: { concentration: "100% Pure Essential Oil", aroma: "Melati & Kenanga" }
  },
  {
    id: "p17", slug: "sabun-herbal-tradisional", name: "Sabun Herbal Tradisional Jawa", category: "Aromaterapi",
    brand: "Aura Nusantara", price: 89000, oldPrice: 120000, discount: 26, rating: 4.8, reviewCount: 95,
    stock: 24, stockStatus: "In Stock", colors: [], sizes: ["100g", "200g"],
    description: "Sabun tradisional dari campuran kunyit, temulawak, dan minyak kelapa murni. Membantu mencerahkan dan melembutkan kulit.",
    images: [L("sabun-alami.jpg")], catalogVisible: false,
    badge: "-26%", featured: false, bestSeller: true, newArrival: false,
    details: { volume: "100g / 200g", ingredients: "Kunyit, temulawak, minyak kelapa" }
  },
  {
    id: "p18", slug: "lulur-tradisional-jawa", name: "Lulur Tradisional Jawa", category: "Aromaterapi",
    brand: "Aura Nusantara", price: 120000, oldPrice: 150000, discount: 20, rating: 4.7, reviewCount: 82,
    stock: 19, stockStatus: "In Stock", colors: [], sizes: ["200g", "500g"],
    description: "Lulur tradisional dari beras, kunyit, dan rempah pilihan Jawa. Mengangkat sel kulit mati dan menjaga kelembaban alami.",
    images: [L("pelembab-herbal.jpg")],
    catalogVisible: false,
    badge: "-20%", featured: false, bestSeller: false, newArrival: true,
    details: { weight: "200g / 500g", ingredients: "Beras, kunyit, rempah Jawa" }
  },
  {
    id: "p19", slug: "parfum-batik-sidoarjo", name: "Parfum Batik Sidoarjo", category: "Aromaterapi",
    brand: "Aura Nusantara", price: 250000, oldPrice: 310000, discount: 19, rating: 4.6, reviewCount: 71,
    stock: 12, stockStatus: "In Stock", colors: [], sizes: ["30ml", "50ml"],
    description: "Parfum lokal dengan aroma melati, sandalwood, dan pandan dalam botol bermotif batik Jetis. Edisi terbatas koleksi Sidoarjo.",
    images: [L("parfum-batik.jpg")], catalogVisible: false,
    badge: "-19%", featured: false, bestSeller: false, newArrival: true,
    details: { concentration: "Eau de Parfum", volume: "30ml / 50ml" }
  },
  {
    id: "p20", slug: "keranjang-anyaman-pandan", name: "Keranjang Anyaman Pandan", category: "Anyaman",
    brand: "Kriya Anyam", price: 189000, oldPrice: 240000, discount: 21, rating: 4.7, reviewCount: 64,
    stock: 21, stockStatus: "In Stock", colors: ["Natural", "Coklat"], sizes: [],
    description: "Keranjang anyaman daun pandan handmade khas Sidoarjo. Kuat, ramah lingkungan, cocok untuk penyimpanan rumah.",
    images: [L("anyaman-pandan.jpg")], catalogVisible: false,
    badge: "-21%", featured: false, bestSeller: true, newArrival: false,
    details: { material: "Daun pandan", diameter: "30 cm" }
  },
  {
    id: "p21", slug: "pot-gerabah-dekorasi", name: "Pot Gerabah Dekorasi", category: "Dekorasi",
    brand: "Kriya Nusantara", price: 129000, oldPrice: 170000, discount: 24, rating: 4.5, reviewCount: 41,
    stock: 17, stockStatus: "In Stock", colors: ["Terracotta", "Natural"], sizes: [],
    description: "Pot gerabah handmade dari tanah liat Sidoarjo dengan finishing glasir alami. Cocok untuk tanaman hias atau dekorasi interior.",
    images: [L("kerajinan-gerabah.jpg")], catalogVisible: false,
    badge: "-24%", featured: false, bestSeller: false, newArrival: true,
    details: { material: "Tanah liat bakar", diameter: "20 cm" }
  },
  {
    id: "p22", slug: "lampu-hias-batik-sidoarjo", name: "Lampu Hias Motif Batik Sidoarjo", category: "Dekorasi",
    brand: "Kriya Nusantara", price: 329000, oldPrice: 420000, discount: 22, rating: 4.6, reviewCount: 53,
    stock: 9, stockStatus: "In Stock", colors: ["Natural", "Coklat"], sizes: [],
    description: "Lampu hias bermotif batik Sidoarjo dengan cahaya hangat untuk mempercantik sudut ruang keluarga atau kamar.",
    images: [L("lampu-batik.jpg")], catalogVisible: false,
    badge: "-22%", featured: false, bestSeller: false, newArrival: true,
    details: { material: "Kayu dengan motif batik", light: "LED E27 warm white" }
  },
  {
    id: "p23", slug: "gelang-kulit-anyam", name: "Gelang Kulit Anyam Tanggulangin", category: "Perhiasan",
    brand: "Tanggulangin Craft", price: 89000, oldPrice: 120000, discount: 26, rating: 4.8, reviewCount: 77,
    stock: 28, stockStatus: "In Stock", colors: ["Coklat", "Hitam", "Tan"], sizes: ["S", "M", "L"],
    description: "Gelang anyaman kulit sapi asli Tanggulangin. Teknik kepang tangan, kait logam kuningan antik. Unisex, cocok untuk pria dan wanita.",
    images: [L("gelang-kulit.jpg")], catalogVisible: false,
    badge: "-26%", featured: false, bestSeller: true, newArrival: false,
    details: { material: "Kulit sapi asli", closure: "Kait kuningan" }
  },
  {
    id: "p24", slug: "tas-pinggang-kulit", name: "Tas Pinggang Kulit Tanggulangin", category: "Kulit Tanggulangin",
    brand: "Tanggulangin Craft", price: 359000, oldPrice: 440000, discount: 18, rating: 4.7, reviewCount: 90,
    stock: 14, stockStatus: "In Stock", colors: ["Coklat", "Hitam"], sizes: [],
    description: "Tas pinggang (waist bag) kulit sapi asli dengan tali adjustable. Dua kompartemen, mudah dibawa saat bepergian atau berwisata.",
    images: [L("tas-pinggang-kulit.jpg")], catalogVisible: false,
    badge: "-18%", featured: true, bestSeller: true, newArrival: false,
    details: { material: "Kulit sapi asli", dimensions: "22 x 13 x 5 cm" }
  },
  {
    id: "p25", slug: "koper-kulit-tanggulangin", name: "Koper Kulit Kabin Tanggulangin", category: "Kulit Tanggulangin",
    brand: "Tanggulangin Craft", price: 1250000, oldPrice: 1500000, discount: 17, rating: 4.7, reviewCount: 89,
    stock: 10, stockStatus: "In Stock", colors: ["Coklat Tua", "Hitam"], sizes: [],
    description: "Koper kabin kulit sapi asli buatan pengrajin Tanggulangin. Rangka besi, roda 360 derajat, kunci kombinasi TSA. Kapasitas 35 liter.",
    images: [L("koper-kulit.jpg")], catalogVisible: false,
    badge: "-17%", featured: false, bestSeller: true, newArrival: false,
    details: { material: "Kulit sapi asli", capacity: "35 liter", lock: "TSA lock" }
  },
  {
    id: "p26", slug: "tas-laptop-kulit", name: "Tas Laptop Kulit Tanggulangin", category: "Kulit Tanggulangin",
    brand: "Tanggulangin Craft", price: 680000, oldPrice: 820000, discount: 17, rating: 4.6, reviewCount: 133,
    stock: 26, stockStatus: "In Stock", colors: ["Coklat", "Hitam"], sizes: [],
    description: "Tas laptop kulit sapi asli untuk laptop 14 inci. Desain messenger bag dengan banyak saku dan tali panjang adjustable.",
    images: [L("tas-laptop-kulit.jpg")], catalogVisible: false,
    badge: "-17%", featured: false, bestSeller: true, newArrival: true,
    details: { material: "Kulit sapi asli", laptop: "Muat laptop 14 inci" }
  },
  {
    id: "p27", slug: "keranjang-anyaman-bambu", name: "Keranjang Anyaman Bambu", category: "Anyaman",
    brand: "Kriya Anyam", price: 129000, oldPrice: 170000, discount: 24, rating: 4.5, reviewCount: 58,
    stock: 35, stockStatus: "In Stock", colors: ["Natural", "Coklat"], sizes: [],
    description: "Keranjang anyaman bambu handmade khas Sidoarjo. Kuat dan ramah lingkungan untuk penyimpanan pakaian, majalah, atau tanaman.",
    images: [L("keranjang-anyaman.webp")],
    badge: "-24%", featured: false, bestSeller: false, newArrival: true,
    details: { material: "Bambu pilihan", diameter: "35 cm" }
  },
  {
    id: "p28", slug: "dompet-batik-jetis", name: "Dompet Batik Jetis Wanita", category: "Batik Jetis",
    brand: "Batik Jetis Studio", price: 179000, oldPrice: 220000, discount: 19, rating: 4.6, reviewCount: 44,
    stock: 11, stockStatus: "In Stock", colors: ["Hitam-Merah", "Coklat-Krem"], sizes: [],
    description: "Dompet wanita dari kain batik tulis Jetis Sidoarjo dengan kombinasi kulit sapi. Banyak slot kartu dan kompartemen koin.",
    images: [L("dompet-batik.jpg")], catalogVisible: false,
    badge: "-19%", featured: false, bestSeller: false, newArrival: true,
    details: { material: "Batik tulis Jetis & kulit sapi", slots: "6 slot kartu" }
  },
  {
    id: "p29", slug: "bros-batik-kuningan", name: "Bros Batik Kuningan", category: "Perhiasan",
    brand: "Kriya Nusantara", price: 75000, oldPrice: 100000, discount: 25, rating: 4.8, reviewCount: 201,
    stock: 48, stockStatus: "In Stock", colors: ["Kuning Emas", "Perak"], sizes: [],
    description: "Bros motif batik dari logam kuningan handmade pengrajin Sidoarjo. Finishing antik yang elegan, cocok untuk kebaya atau kemeja batik.",
    images: [L("bros-batik.jpg")], catalogVisible: false,
    badge: "-25%", featured: false, bestSeller: true, newArrival: false,
    details: { material: "Kuningan", finish: "Antik emas / perak" }
  },
  {
    id: "p30", slug: "tikar-anyaman-pandan", name: "Tikar Anyaman Pandan", category: "Anyaman",
    brand: "Kriya Anyam", price: 159000, oldPrice: 200000, discount: 20, rating: 4.4, reviewCount: 36,
    stock: 22, stockStatus: "In Stock", colors: ["Natural", "Coklat"], sizes: [],
    description: "Tikar anyaman daun pandan khas Sidoarjo. Ramah lingkungan, alas duduk yang sejuk dan alami untuk ruang keluarga atau teras.",
    images: [L("anyaman-pandan.jpg")],
    catalogVisible: false,
    badge: "-20%", featured: false, bestSeller: false, newArrival: true,
    details: { material: "Daun pandan", ukuran: "100 x 150 cm" }
  },
  {
    id: "p31", slug: "jam-dinding-kayu-motif-pohon", name: "Jam Dinding Kayu Motif Pohon", category: "Dekorasi",
    brand: "Kriya Nusantara", price: 229000, oldPrice: 280000, discount: 18, rating: 4.5, reviewCount: 29,
    stock: 8, stockStatus: "In Stock", colors: ["Hitam", "Coklat"], sizes: [],
    description: "Jam dinding kayu dengan motif pohon untuk dekorasi ruangan.",
    images: [L("jam-dinding-kayu-unsplash.jpg")],
    imageCredit: {
      source: "Vuong Ngan / Unsplash",
      sourceUrl: "https://unsplash.com/photos/a-wooden-clock-with-a-tree-design-on-it-MPwLD5iGmLA",
      license: "Unsplash License",
      licenseUrl: "https://unsplash.com/license",
      changes: "diubah ukuran"
    },
    badge: "-18%", featured: false, bestSeller: false, newArrival: false,
    details: { material: "Kayu", movement: "Silent quartz" }
  },
  {
    id: "p32", slug: "gantungan-kunci-kulit", name: "Gantungan Kunci Kulit Tanggulangin", category: "Kulit Tanggulangin",
    brand: "Tanggulangin Craft", price: 49000, oldPrice: 75000, discount: 35, rating: 4.6, reviewCount: 61,
    stock: 0, stockStatus: "Out of Stock", colors: ["Coklat", "Hitam"], sizes: [],
    description: "Gantungan kunci dari kulit dengan ring logam, cocok sebagai aksesori dan cendera mata. Stok sedang diisi ulang.",
    images: [L("gantungan-kunci-kulit-wikimedia.jpg")],
    imageCredit: {
      source: "TheEgyptian / Wikimedia Commons",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Leather_key_chain.JPG",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      changes: "diubah ukuran"
    },
    badge: "SOLD OUT", featured: false, bestSeller: false, newArrival: false,
    details: { material: "Kulit sapi asli" }
  },
  {
    id: "p33", slug: "kaos-batik-sidoarjo", name: "Kaos Batik Cap Sidoarjo", category: "Batik Jetis",
    brand: "Batik Jetis Studio", price: 185000, oldPrice: 230000, discount: 20, rating: 4.5, reviewCount: 87,
    stock: 33, stockStatus: "In Stock", colors: ["Hitam", "Coklat", "Biru"], sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Kaos batik cap khas Sidoarjo berbahan katun combed 30s. Motif batik Jetis dicetak manual dengan malam, warna alami tahan lama.",
    images: [L("kaos-batik.jpg")], catalogVisible: false,
    badge: "-20%", featured: false, bestSeller: false, newArrival: true,
    details: { material: "Katun combed 30s", motif: "Batik cap Jetis" }
  },
  {
    id: "p34", slug: "kemeja-lurik-sidoarjo", name: "Kemeja Lurik Sidoarjo", category: "Batik Jetis",
    brand: "Batik Jetis Studio", price: 320000, oldPrice: 400000, discount: 20, rating: 4.7, reviewCount: 52,
    stock: 14, stockStatus: "In Stock", colors: ["Hitam-Putih", "Coklat-Krem"], sizes: ["S", "M", "L", "XL"],
    description: "Kemeja tenun lurik khas Jawa Timur dari pengrajin Sidoarjo. Bahan katun tenun ATBM, motif garis tradisional yang elegan.",
    images: [L("baju-lurik.jpg")], catalogVisible: false,
    badge: "JUST IN", featured: true, bestSeller: false, newArrival: true,
    details: { material: "Katun tenun ATBM", motif: "Lurik Palupi" }
  },
  {
    id: "p35", slug: "dompet-kulit-mini", name: "Dompet Lipat Kulit Mini", category: "Kulit Tanggulangin",
    brand: "Tanggulangin Craft", price: 99000, oldPrice: 135000, discount: 27, rating: 4.6, reviewCount: 73,
    stock: 16, stockStatus: "In Stock", colors: ["Coklat", "Hitam", "Tan"], sizes: [],
    description: "Dompet lipat kulit buatan tangan dengan kompartemen uang dan kartu.",
    images: [L("dompet-koin-kulit-unsplash.jpg")],
    imageCredit: {
      source: "Silver G Shoots / Unsplash",
      sourceUrl: "https://unsplash.com/photos/brown-leather-bifold-wallet-beside-silver-round-coins-and-black-round-case-k1jn594X_Zk",
      license: "Unsplash License",
      licenseUrl: "https://unsplash.com/license",
      changes: "diubah ukuran"
    },
    badge: "-27%", featured: false, bestSeller: false, newArrival: false,
    details: { material: "Kulit sapi asli", dimensions: "10 x 8 cm" }
  },
  {
    id: "p36", slug: "krim-herbal-jawa", name: "Krim Pelembab Herbal Jawa", category: "Aromaterapi",
    brand: "Aura Nusantara", price: 120000, oldPrice: 160000, discount: 25, rating: 4.4, reviewCount: 39,
    stock: 27, stockStatus: "In Stock", colors: [], sizes: ["50ml", "100ml"],
    description: "Krim pelembab kulit dari bahan herbal tradisional Jawa: lidah buaya, minyak kemiri, dan kunyit. Tanpa bahan kimia berbahaya.",
    images: [L("pelembab-herbal.jpg")], catalogVisible: false,
    badge: "-25%", featured: false, bestSeller: false, newArrival: true,
    details: { volume: "50ml / 100ml", ingredients: "Lidah buaya, kemiri, kunyit" }
  },
  {
    id: "p37",
    slug: "tas-anyaman-pandan",
    name: "Keranjang Anyaman Pandan",
    category: "Anyaman",
    brand: "Kriya Anyam",
    price: 299000,
    oldPrice: 350000,
    discount: 14,
    rating: 4.5,
    reviewCount: 30,
    stock: 15,
    stockStatus: "In Stock",
    colors: ["Natural", "Coklat"],
    sizes: [],
    description: "Keranjang anyaman daun pandan buatan tangan untuk penyimpanan dan dekorasi rumah.",
    images: [L("anyaman-pandan.jpg")],
    catalogVisible: false,
    badge: "JUST IN",
    featured: false,
    bestSeller: false,
    newArrival: true,
    details: { material: "Daun pandan" }
  },
  {
    id: "p38",
    slug: "kerajinan-bambu-craft",
    name: "Keranjang Anyaman Bambu",
    category: "Anyaman",
    brand: "Kriya Nusantara",
    price: 399000,
    oldPrice: 470000,
    discount: 15,
    rating: 4.6,
    reviewCount: 22,
    stock: 12,
    stockStatus: "In Stock",
    colors: ["Natural"],
    sizes: [],
    description: "Keranjang anyaman bambu buatan tangan untuk penyimpanan dan dekorasi rumah.",
    images: [L("anyaman-bambu.jpg")],
    catalogVisible: false,
    badge: "JUST IN",
    featured: false,
    bestSeller: false,
    newArrival: true,
    details: { material: "Bambu" }
  },
  {
    id: "p39",
    slug: "kain-batik-jetis-karya-tulis",
    name: "Kain Batik Jetis Tulis",
    category: "Batik Jetis",
    brand: "Batik Jetis Studio",
    price: 259000,
    oldPrice: 310000,
    discount: 16,
    rating: 4.7,
    reviewCount: 18,
    stock: 20,
    stockStatus: "In Stock",
    colors: ["Berwarna"],
    sizes: [],
    description: "Kain batik tulis Jetis bermotif flora yang dibuat dengan teknik canting tradisional.",
    images: [L("kain-batik-jetis.jpg")],
    catalogVisible: false,
    badge: "JUST IN",
    featured: false,
    bestSeller: false,
    newArrival: true,
    details: { material: "Kain batik" }
  }
];
const BLOG_POSTS = [
  {
    id: "b01",
    slug: "kerajinan-kulit-tanggulangin",
    title: "Keindahan Kerajinan Kulit Tanggulangin Sidoarjo",
    category: "Kerajinan",
    date: "2026-09-12",
    author: "Nadia Kriya",
    excerpt: "Tanggulangin adalah pusat kerajinan kulit terbesar di Jawa Timur. Temukan kisah di balik setiap jahitan tangan para pengrajin lokal.",
    image: L("tas-kulit-tanggulangin.jpg"),
    content: [
      "Tanggulangin, sebuah kecamatan di Sidoarjo, telah lama dikenal sebagai sentra kerajinan kulit terbesar di Jawa Timur. Para pengrajin di sini mewariskan keahlian membuat tas, sepatu, dan dompet kulit secara turun-temurun selama lebih dari 40 tahun.",
      "Setiap produk kulit Tanggulangin dikerjakan dengan tangan — mulai dari memotong kulit, menjahit dengan jarum tangan, hingga memasang hardware. Kualitas yang dihasilkan setara dengan produk premium namun dengan harga yang jauh lebih terjangkau.",
      "TokoKriya berkolaborasi langsung dengan para pengrajin Tanggulangin untuk memastikan setiap produk yang Anda terima adalah hasil kerja tangan asli, bukan produksi massal."
    ]
  },
  {
    id: "b02",
    slug: "mengenal-batik-jetis-sidoarjo",
    title: "Batik Jetis: Warisan Budaya Sidoarjo yang Tak Lekang",
    category: "Batik",
    date: "2026-09-02",
    author: "Raka Putra",
    excerpt: "Batik Jetis Sidoarjo memiliki ciri khas motif sogan dengan warna gelap dan corak flora yang khas. Kenali lebih dalam warisan budaya ini.",
    image: L("kain-batik-jetis.jpg"),
    content: [
      "Batik Jetis adalah salah satu batik tertua di Jawa Timur yang berasal dari Kelurahan Jetis, Sidoarjo. Karakteristiknya yang khas adalah dominasi warna sogan (coklat kehitaman) dengan motif flora dan fauna yang detail.",
      "Proses pembuatan batik tulis Jetis memakan waktu berminggu-minggu. Pengrajin menggunakan canting untuk menuang malam (lilin batik) di atas kain katun primissima, kemudian mewarnainya dengan pewarna alami dari tanaman lokal.",
      "TokoKriya bangga menjadi salah satu platform yang memperkenalkan keindahan Batik Jetis kepada pembeli modern, sambil memastikan pengrajin lokal mendapatkan penghargaan yang setimpal."
    ]
  },
  {
    id: "b03",
    slug: "anyaman-tradisional-sidoarjo",
    title: "Anyaman Pandan: Keahlian Tangan dari Sidoarjo",
    category: "Kerajinan",
    date: "2026-08-21",
    author: "Mira Sari",
    excerpt: "Anyaman daun pandan dari Sidoarjo dikenal kuat, rapi, dan ramah lingkungan. Simak cara pengrajin lokal menciptakan keindahan dari alam.",
    image: L("anyaman-pandan.jpg"),
    content: [
      "Kerajinan anyaman pandan dari Sidoarjo adalah salah satu produk unggulan UMKM lokal. Daun pandan dipanen, dikeringkan, dan dianyam menjadi berbagai produk: keranjang, tikar, topi, hingga tas.",
      "Yang membedakan anyaman Sidoarjo adalah ketelitian motif dan ketahanan produknya. Dengan pewarna alami dari tumbuhan, warna anyaman tahan bertahun-tahun tanpa memudar.",
      "TokoKriya memilih produk anyaman yang dikerjakan oleh kelompok ibu-ibu pengrajin di desa sekitar Sidoarjo sebagai bagian dari program pemberdayaan ekonomi lokal."
    ]
  },
  {
    id: "b04",
    slug: "cara-merawat-produk-kulit",
    title: "Tips Merawat Produk Kulit Tanggulangin Agar Awet",
    category: "Panduan",
    date: "2026-08-08",
    author: "Nadia Kriya",
    excerpt: "Produk kulit asli butuh perawatan yang tepat. Ikuti panduan sederhana ini agar tas, dompet, dan ikat pinggang kulit Anda bertahan puluhan tahun.",
    image: L("dompet-kulit-tanggulangin.jpg"),
    content: [
      "Kulit sapi asli adalah material yang makin indah seiring waktu jika dirawat dengan benar. Pertama, hindari paparan air berlebih dan sinar matahari langsung yang dapat membuat kulit retak dan memudar.",
      "Gunakan leather conditioner setiap 2-3 bulan sekali untuk menjaga kelembaban kulit. Simpan di tempat yang sejuk dan gunakan dust bag saat tidak dipakai.",
      "Untuk noda ringan, cukup usap dengan kain lembap. Hindari sabun berlebih. Produk kulit yang dirawat dengan baik bisa bertahan 20-30 tahun dan memiliki karakter yang semakin cantik."
    ]
  }
];
const FAQS = [
  { cat: "shipping", q: "Berapa lama pengiriman ke Sidoarjo dan sekitarnya?", a: "Untuk Sidoarjo dan Surabaya biasanya 1–2 hari kerja. Kota lain di Jawa 2–5 hari tergantung kurir yang dipilih di checkout." },
  { cat: "shipping", q: "Apakah ada gratis ongkir?", a: "Ya. Belanja minimal Rp 500.000 mendapat gratis ongkir, atau gunakan kode FREESHIP." },
  { cat: "payment", q: "Metode pembayaran apa yang tersedia?", a: "Bank Transfer, OVO, GoPay, kartu kredit (simulasi), dan COD. Ini proyek frontend — tidak ada pembayaran sungguhan." },
  { cat: "payment", q: "Kode kupon apa yang bisa dipakai?", a: "KRIYA10 (diskon 10%), WELCOME15 (diskon 15%), dan FREESHIP (gratis ongkir)." },
  { cat: "return", q: "Bagaimana kebijakan retur?", a: "Retur dalam 7 hari jika barang cacat atau salah kirim. Produk harus belum dipakai dan dilengkapi tag." },
  { cat: "account", q: "Apakah saya perlu membuat akun?", a: "Checkout bisa diisi tanpa login server. Profil, alamat, dan pesanan disimpan di browser (LocalStorage) untuk demo." },
  { cat: "orders", q: "Bagaimana melacak pesanan?", a: "Buka My Orders, pilih pesanan, lalu gunakan Track Order. Status bersifat simulasi." },
  { cat: "products", q: "Apakah stok real-time?", a: "Stok adalah data demo. Produk bertanda Out of Stock tidak dapat ditambahkan ke keranjang." }
];

const DEFAULT_REVIEWS = [
  { name: "Ayu P.", rating: 5, text: "Kualitas kulit benar-benar asli, jahitannya rapi. Pengiriman ke Sidoarjo cepat." },
  { name: "Dimas R.", rating: 4, text: "Batik Jetis-nya cantik sekali, motifnya halus. Akan beli lagi buat hadiah." },
  { name: "Sinta L.", rating: 5, text: "Tas kulit Tanggulangin kualitasnya luar biasa, harga jauh lebih murah dari branded. Recommended!" }
];
