# Claude Unlimited Project Manager (Android & Web)

Bu sistem, bilgisayara ihtiyaç duymadan doğrudan Android cihazınızın tarayıcısı üzerinden Claude ve diğer yapay zeka modellerini ücretsiz kullanmanıza olanak tanır.

## 📱 Android Üzerinden Kullanım

1. **Arayüze Erişin**: Size sağlanan web bağlantısını Android tarayıcınızda açın.
2. **Ayarları Yapılandırın**:
   - Sağ üstteki **Ayarlar (çark)** simgesine tıklayın.
   - **Provider**: `OpenRouter` seçin.
   - **API Key**: [OpenRouter](https://openrouter.ai/) üzerinden alacağınız ücretsiz anahtarı buraya yapıştırın. (OpenRouter'da birçok model tamamen ücretsizdir).
   - **Model**: `google/gemma-2-9b-it:free` veya `qwen/qwen-2.5-72b-instruct:free` gibi ücretsiz modelleri yazın.
   - **Kaydet**'e basın.
3. **Proje Başlatın**: Ana ekrandan "New Project" diyerek projenizi tanımlayın.
4. **Geliştirmeye Başlayın**: Sohbet arayüzü üzerinden Claude'a talimatlar verin, o projenizi geliştirsin.

## 🛠 Teknik Özellikler
- **Mobil Uyumlu**: Arayüz tamamen mobil cihazlar (telefon/tablet) için optimize edilmiştir.
- **Client-Side API Key**: API anahtarlarınız sunucuda saklanmaz, sadece tarayıcınızda (localStorage) tutulur. Bu güvenlidir.
- **Sınırsız Gelişim**: Claude projenizin her aşamasını takip eder ve sürekli olarak ilerletir.

## 🆓 Ücretsiz Seçenekler
- **OpenRouter Free**: Hiçbir ücret ödemeden en gelişmiş açık kaynaklı modelleri kullanabilirsiniz.
- **Ollama**: Eğer bir sunucunuz varsa, Ollama üzerinden tamamen yerel ve sınırsız kullanım sağlayabilirsiniz.

---
*Not: Bu sistem bir arayüzdür. Yapay zeka gücünü OpenRouter gibi sağlayıcılardan alır. Ücretsiz kullanım için OpenRouter'ın `:free` etiketli modellerini tercih etmeniz önerilir.*
