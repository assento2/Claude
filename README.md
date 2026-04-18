# Claude Unlimited Project Manager (Android & Web)

Bu sistem, bilgisayara ihtiyaç duymadan doğrudan Android cihazınızın tarayıcısı üzerinden Claude ve diğer yapay zeka modellerini ücretsiz kullanmanıza olanak tanır.

## 🚀 Ücretsiz Yayınlama (Render.com)

Projeyi internette aktif etmek için Render.com kullanabilirsiniz:

1. **GitHub**: Bu kodları kendi GitHub hesabınıza yükleyin.
2. **Render**: [Render.com](https://render.com/)'a üye olun ve "New > Web Service" seçin.
3. **Bağlantı**: GitHub deponuzu bağlayın.
4. **Ayarlar**:
   - **Runtime**: `Python` veya `Docker` seçebilirsiniz (Dockerfile hazırlandı).
   - **Build Command**: `cd frontend && npm install && npm run build && cd ../backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && python main.py`
5. **Environment Variables**: Render panelinde `PORT` değerini `8000` olarak görecektir, otomatik ayarlanır.

## 📱 Android Üzerinden Kullanım

1. **Arayüze Erişin**: Render'ın size verdiği `https://proje-adi.onrender.com` bağlantısını açın.
2. **Ayarları Yapılandırın**:
   - Sağ üstteki **Ayarlar** simgesine tıklayın.
   - **Provider**: `OpenRouter` seçin.
   - **API Key**: OpenRouter ücretsiz anahtarınızı girin.
   - **Model**: `google/gemma-2-9b-it:free` yazın.
3. **Proje Başlatın**: "New Project" ile başlayın.

## 🆓 Neden Ücretsiz?
- **Render**: Ücretsiz web servisi sağlar.
- **OpenRouter Free Models**: Claude kalitesine yakın açık kaynaklı modelleri ücretsiz sunar.
- **Sınırsız**: Kendi API anahtarınızı kullandığınız için sistem limitlerine takılmazsınız.
