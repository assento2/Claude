# Claude Unlimited Project Manager

Bu proje, Claude yapay zekasını (ve diğer modelleri) projelerinizi geliştirmek için kullanabileceğiniz bir web arayüzü sağlar.

## Özellikler
- **Çoklu Model Desteği**: Anthropic (Claude), OpenRouter ve Ollama (Yerel).
- **Ücretsiz Kullanım**:
    - **Ollama**: Kendi bilgisayarınızda Ollama çalıştırarak Llama 3 veya Gemma gibi modelleri tamamen ücretsiz ve sınırsız kullanabilirsiniz.
    - **OpenRouter**: OpenRouter üzerindeki ücretsiz modelleri (örneğin Qwen veya bazı Llama sürümleri) kullanabilirsiniz.
- **Proje Takibi**: Projenizi aşamalara ayırır ve Claude ile adım adım geliştirmenize olanak tanır.

## Nasıl Başlanır?

### 1. Backend Kurulumu
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Çevresel Değişkenler
`backend/.env` dosyası oluşturun:
```env
# Ücretsiz kullanım için Ollama kullanıyorsanız:
LLM_PROVIDER=ollama

# Veya OpenRouter üzerinden ücretsiz modeller için:
# LLM_PROVIDER=openrouter
# OPENROUTER_API_KEY=your_key_here

# Gerçek Claude kullanmak isterseniz:
# LLM_PROVIDER=anthropic
# ANTHROPIC_API_KEY=your_key_here
```

### 3. Çalıştırma
**Backend:**
```bash
cd backend
python3 main.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Ücretsiz Kullanım Hakkında Not
Claude API resmi olarak ücretlidir. Ancak bu sistem, **Ollama** entegrasyonu sayesinde kendi bilgisayarınızdaki işlem gücünü kullanarak benzer bir deneyimi tamamen ücretsiz sunar. Web sitesi üzerinden başlattığınız projenin aşamaları Claude'a (veya seçtiğiniz modele) iletilir ve sürekli gelişim sağlanır.
