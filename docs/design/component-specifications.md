# コンポーネント設計書

## 🎯 設計方針

reference-site.htmlの完全再現を目的とした、再利用可能なReactコンポーネント設計

### 設計原則
1. **Single Responsibility**: 各コンポーネントは単一の責任を持つ
2. **Reusability**: 再利用可能性を重視
3. **Accessibility**: WCAG AA準拠
4. **Performance**: パフォーマンス最適化
5. **Type Safety**: TypeScript完全対応

---

## 📦 コンポーネント階層

```
app/
├── layout.tsx                 # Root Layout
├── page.tsx                   # Home Page
├── loading.tsx                # Loading UI
└── error.tsx                  # Error UI

components/
├── ui/                        # 基本UIコンポーネント
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   └── LoadingSpinner.tsx
├── layout/                    # レイアウトコンポーネント
│   ├── Header.tsx
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── LoadingScreen.tsx
├── sections/                  # セクションコンポーネント
│   ├── HeroSection.tsx
│   ├── MessageSection.tsx
│   ├── CountdownSection.tsx
│   ├── InformationSection.tsx
│   └── RSVPSection.tsx
└── forms/                     # フォームコンポーネント
    ├── RSVPForm.tsx
    ├── ContactForm.tsx
    └── form-fields/
        ├── RadioGroup.tsx
        ├── TextInput.tsx
        └── TextArea.tsx
```

---

## 🎨 基本UIコンポーネント

### Button Component
```typescript
// components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  children,
  className = '',
  type = 'button'
}) => {
  const baseClasses = 'font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-akane-500 text-white hover:bg-akane-600 focus:ring-akane-500',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
    outline: 'border-2 border-akane-500 text-akane-500 hover:bg-akane-500 hover:text-white focus:ring-akane-500',
    ghost: 'text-akane-500 hover:bg-akane-50 focus:ring-akane-500'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {loading ? <LoadingSpinner size="sm" /> : children}
    </button>
  );
};
```

### Input Component
```typescript
// components/ui/Input.tsx
interface InputProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel' | 'number';
  className?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  required = false,
  error,
  value,
  onChange,
  type = 'text',
  className = '',
  disabled = false
}) => {
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          w-full px-4 py-3 border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent
          disabled:bg-gray-50 disabled:cursor-not-allowed
          transition-colors duration-200
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
```

### Modal Component
```typescript
// components/ui/Modal.tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        <span className="inline-block h-screen align-middle">&#8203;</span>
        
        <div className={`
          inline-block w-full ${sizeClasses[size]} p-6 my-8 overflow-hidden
          text-left align-middle transition-all transform bg-white shadow-xl rounded-lg
        `}>
          {title && (
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            </div>
          )}
          
          <div>{children}</div>
          
          <div className="mt-4 text-right">
            <Button variant="ghost" onClick={onClose}>
              閉じる
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

## 🏗️ レイアウトコンポーネント

### LoadingScreen Component
```typescript
// components/layout/LoadingScreen.tsx
interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // SVGアニメーション開始
    const vivusInstance = new Vivus('loading', {
      type: 'delayed',
      duration: 200,
      animTimingFunction: Vivus.EASE_OUT
    }, () => {
      // アニメーション完了後の処理
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 800);
      }, 2000);
    });
    
    return () => vivusInstance.destroy();
  }, [onComplete]);
  
  if (!isVisible) return null;
  
  return (
    <div id="loader-bg" className="fixed inset-0 z-50 bg-gradient-to-br from-akane-100 to-akane-200">
      <div id="loader_wrap" className="flex items-center justify-center h-full">
        <svg id="loading" className="w-64 h-64">
          {/* reference-site.htmlのSVGパスをここに配置 */}
        </svg>
      </div>
    </div>
  );
};
```

### Header Component
```typescript
// components/layout/Header.tsx
interface HeaderProps {
  backgroundImages: string[];
  coupleNames: {
    groom: string;
    bride: string;
  };
  weddingDate: string;
  venue: string;
}

const Header: React.FC<HeaderProps> = ({
  backgroundImages,
  coupleNames,
  weddingDate,
  venue
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [showCouple, setShowCouple] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  
  useEffect(() => {
    // ローディング完了後のアニメーション制御
    if (isLoaded) {
      setTimeout(() => setShowInvitation(true), 100);
      setTimeout(() => setShowCouple(true), 700);
      setTimeout(() => setShowScroll(true), 8000);
    }
  }, [isLoaded]);
  
  return (
    <header className="header relative h-screen overflow-hidden">
      {/* 背景カルーセル */}
      <div 
        className={`carousel absolute inset-0 transition-all duration-500 ${!showCouple ? 'blur-sm' : ''}`}
        style={{
          backgroundImage: `url(${backgroundImages[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* メインコンテンツ */}
      <div className="header-cont-wrap absolute inset-0 flex items-center justify-center text-white text-center z-10">
        <div className="header-cont">
          <p className={`kv_invitation text-3xl md:text-4xl font-light mb-8 transition-all duration-800 ${
            showInvitation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            ご招待状
          </p>
          
          <div className={`crmny transition-all duration-800 ${
            showCouple ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <div className="name font-playfair text-4xl md:text-6xl lg:text-8xl font-light mb-4">
              <span>{coupleNames.groom}</span>
              <span className="mx-4">and</span>
              <span>{coupleNames.bride}</span>
            </div>
            
            <time className="time text-xl md:text-2xl lg:text-3xl mb-2">
              {weddingDate}
            </time>
            
            <p className="places text-lg md:text-xl lg:text-2xl">
              at <span>{venue}</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* スクロールインジケーター */}
      <div className={`scroll absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${
        showScroll ? 'opacity-100' : 'opacity-0'
      }`}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 15.5l-6-6h12l-6 6z"/>
        </svg>
      </div>
    </header>
  );
};
```

### Navigation Component
```typescript
// components/layout/Navigation.tsx
interface NavigationItem {
  en: string;
  ja: string;
  href: string;
}

interface NavigationProps {
  items: NavigationItem[];
}

const Navigation: React.FC<NavigationProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };
  
  return (
    <>
      {/* ハンバーガーアイコン */}
      <div 
        id="hamburger"
        className={`fixed top-8 right-8 w-10 h-10 cursor-pointer z-50 ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
      >
        <span className={`inner_line block w-full h-0.5 bg-white mb-2 transition-all duration-300 ${
          isOpen ? 'rotate-45 translate-y-2.5' : ''
        }`} />
        <span className={`inner_line block w-full h-0.5 bg-white mb-2 transition-all duration-300 ${
          isOpen ? 'opacity-0' : ''
        }`} />
        <span className={`inner_line block w-full h-0.5 bg-white transition-all duration-300 ${
          isOpen ? '-rotate-45 -translate-y-2.5' : ''
        }`} />
      </div>
      
      {/* サイドメニュー */}
      <nav className={`nav fixed top-0 right-0 w-80 h-full bg-white bg-opacity-95 backdrop-blur-md z-40 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="nav-cont p-8 pt-20">
          <ul className="space-y-8">
            {items.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="block text-gray-800 hover:text-akane-500 transition-colors duration-300"
                >
                  <span className="en block font-playfair text-xl font-semibold">
                    {item.en}
                  </span>
                  <span className="ja block text-sm text-gray-600 mt-1">
                    {item.ja}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsOpen(false);
            }}
            className="nav-pagetop mt-12 inline-block"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8.5l6 6H6l6-6z"/>
            </svg>
          </a>
        </div>
      </nav>
      
      {/* オーバーレイ */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
```

---

## 📋 セクションコンポーネント

### MessageSection Component
```typescript
// components/sections/MessageSection.tsx
interface ProfileData {
  role: '新郎' | '新婦';
  nameJp: string;
  nameEn: string;
  photo: string;
  introduction: string;
}

interface MessageSectionProps {
  greetingMessage: string;
  groomData: ProfileData;
  brideData: ProfileData;
}

const MessageSection: React.FC<MessageSectionProps> = ({
  greetingMessage,
  groomData,
  brideData
}) => {
  return (
    <section id="message" className="message py-24 bg-gradient-to-br from-akane-50 to-akane-100">
      <div className="container-full max-w-6xl mx-auto px-8">
        {/* 挨拶部分 */}
        <div className="greeting text-center mb-16">
          <h2 className="mb-8">
            <span className="en block font-playfair text-4xl md:text-5xl font-normal mb-2 text-akane-600">
              ご挨拶
            </span>
            <span className="ja text-sm md:text-base text-gray-600 tracking-widest">
              MESSAGE
            </span>
          </h2>
          
          <div className="txt-wrap">
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-2xl mx-auto whitespace-pre-line">
              {greetingMessage}
            </p>
          </div>
        </div>
        
        {/* 新郎新婦紹介 */}
        <div className="intro">
          <div className="message-detail-wrap grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* 新郎 */}
            <ProfileCard data={groomData} />
            
            {/* 新婦 */}
            <ProfileCard data={brideData} />
          </div>
        </div>
      </div>
    </section>
  );
};

const ProfileCard: React.FC<{ data: ProfileData }> = ({ data }) => {
  return (
    <div className="message-detail text-center">
      <div className="user-photo mb-8">
        <div className="photo relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
          <Image
            src={data.photo}
            alt={data.nameJp}
            fill
            className="object-cover"
          />
        </div>
        <p className="photo_tit text-lg text-akane-600 font-semibold">
          {data.role}
        </p>
      </div>
      
      <div className="introduction">
        <div className="name_jp text-2xl font-semibold mb-2 text-gray-800">
          {data.nameJp}
        </div>
        <div className="name_ab font-playfair text-xl text-akane-500 mb-6 whitespace-pre-line">
          {data.nameEn}
        </div>
        <p className="introduction_txt text-base leading-relaxed text-gray-600 text-left whitespace-pre-line">
          {data.introduction}
        </p>
      </div>
    </div>
  );
};
```

### CountdownSection Component
```typescript
// components/sections/CountdownSection.tsx
interface CountdownSectionProps {
  weddingDate: string;
  backgroundImage?: string;
}

const CountdownSection: React.FC<CountdownSectionProps> = ({
  weddingDate,
  backgroundImage
}) => {
  const [daysLeft, setDaysLeft] = useState<number>(0);
  
  useEffect(() => {
    const calculateDaysLeft = () => {
      const wedding = new Date(weddingDate);
      const today = new Date();
      const diffTime = wedding.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysLeft(Math.max(0, diffDays));
    };
    
    calculateDaysLeft();
    const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60); // 1時間ごと更新
    
    return () => clearInterval(interval);
  }, [weddingDate]);
  
  return (
    <section id="countdown" className="countdown relative py-24 bg-gray-900 text-white text-center overflow-hidden">
      {/* 背景画像 */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Countdown background"
            fill
            className="object-cover opacity-30"
          />
        </div>
      )}
      
      <div className="cont relative z-10">
        {/* SVGタイトル */}
        <div className="mb-8">
          <svg
            className="w-full max-w-2xl h-auto mx-auto"
            viewBox="0 0 607.54 371.25"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <text className="fill-current font-playfair text-6xl font-normal" x="0" y="62.9">
                COUNTDOWN
              </text>
              <text className="fill-current font-playfair text-3xl font-light" x="124.48" y="113.07">
                To Our Wedding
              </text>
              <text className="fill-current font-playfair text-4xl font-normal" x="240.97" y="356.37">
                DAYS
              </text>
            </g>
          </svg>
        </div>
        
        {/* カウントダウン数字 */}
        <p className="countdown-num text-8xl md:text-9xl font-bold text-akane-400">
          {daysLeft.toLocaleString()}
        </p>
      </div>
    </section>
  );
};
```

### InformationSection Component
```typescript
// components/sections/InformationSection.tsx
interface EventInfo {
  title: { en: string; ja: string };
  date: string;
  time: string;
  venue: {
    name: string;
    address: string;
    phone: string;
    website?: string;
  };
}

interface InformationSectionProps {
  ceremonyInfo: EventInfo;
  receptionInfo: EventInfo;
  mapEmbedUrl: string;
}

const InformationSection: React.FC<InformationSectionProps> = ({
  ceremonyInfo,
  receptionInfo,
  mapEmbedUrl
}) => {
  return (
    <section id="infomation" className="info py-24 bg-white">
      <div className="container max-w-6xl mx-auto px-8">
        <h2 className="text-center mb-16">
          <span className="en block font-playfair text-4xl md:text-5xl font-normal mb-2 text-akane-600">
            ご案内
          </span>
          <span className="ja text-sm md:text-base text-gray-600 tracking-widest">
            INFORMATION
          </span>
        </h2>
        
        <div className="schedule grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* 挙式情報 */}
          <EventCard 
            info={ceremonyInfo}
            mapEmbedUrl={mapEmbedUrl}
            showMap={true}
          />
          
          {/* 披露宴情報 */}
          <EventCard 
            info={receptionInfo}
            mapEmbedUrl={mapEmbedUrl}
            showMap={false}
          />
        </div>
      </div>
    </section>
  );
};

const EventCard: React.FC<{
  info: EventInfo;
  mapEmbedUrl: string;
  showMap: boolean;
}> = ({ info, mapEmbedUrl, showMap }) => {
  return (
    <div className="box text-center">
      <div className="tit mb-8">
        <span className="en block font-playfair text-2xl md:text-3xl font-normal text-akane-600 mb-2 whitespace-pre-line">
          {info.title.en}
        </span>
        <span className="ja text-lg text-gray-600 tracking-widest">
          {info.title.ja}
        </span>
      </div>
      
      <div className="detail mb-8">
        <p className="text-xl leading-relaxed text-gray-700">
          {info.date}<br />
          {info.time}
        </p>
      </div>
      
      {showMap && (
        <div className="access">
          <div className="txt mb-8">
            <div className="tit-access mb-4">
              <span className="en block font-playfair text-lg font-semibold text-akane-600">
                Access
              </span>
              <span className="ja text-sm text-gray-600">アクセス</span>
            </div>
            
            <p className="place text-xl font-semibold text-gray-800 mb-2">
              {info.venue.name}
            </p>
            
            <div className="address text-base text-gray-600 leading-relaxed">
              {info.venue.address}
              <a 
                href={`tel:${info.venue.phone}`}
                className="block mt-2 text-akane-500 hover:underline"
              >
                {info.venue.phone}
              </a>
              {info.venue.website && (
                <a 
                  href={info.venue.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-akane-500 hover:underline"
                >
                  {info.venue.website}
                </a>
              )}
            </div>
          </div>
          
          <div className="map mb-8">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};
```

---

## 📝 フォームコンポーネント

### RSVPForm Component
```typescript
// components/forms/RSVPForm.tsx
interface RSVPFormData {
  status: 1 | 2; // 1: 出席, 2: 欠席
  guest_side: 0 | 1; // 0: 新郎側, 1: 新婦側
  jpn_family_name: string;
  jpn_first_name: string;
  kana_family_name?: string;
  kana_first_name?: string;
  rom_family_name: string;
  rom_first_name: string;
  email: string;
  phone_number?: string;
  zipcode?: string;
  address?: string;
  address2?: string;
  age_category?: 0 | 1 | 2; // 0: 大人, 1: 子供, 2: 幼児
  allergy_flag: 0 | 1; // 0: なし, 1: あり
  allergy?: string;
  guest_message?: string;
}

interface RSVPFormProps {
  onSubmit: (data: RSVPFormData) => Promise<void>;
  isLoading: boolean;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<RSVPFormData>({
    status: 1,
    guest_side: 0,
    jpn_family_name: '',
    jpn_first_name: '',
    rom_family_name: '',
    rom_first_name: '',
    email: '',
    allergy_flag: 0
  });
  
  const [errors, setErrors] = useState<Partial<RSVPFormData>>({});
  const [showAllergyField, setShowAllergyField] = useState(false);
  
  const validateForm = (): boolean => {
    const newErrors: Partial<RSVPFormData> = {};
    
    if (!formData.jpn_family_name) newErrors.jpn_family_name = '姓を入力してください';
    if (!formData.jpn_first_name) newErrors.jpn_first_name = '名を入力してください';
    if (!formData.rom_family_name) newErrors.rom_family_name = 'Last nameを入力してください';
    if (!formData.rom_first_name) newErrors.rom_first_name = 'First nameを入力してください';
    if (!formData.email) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '正しいメールアドレスを入力してください';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Submit error:', error);
    }
  };
  
  const updateField = (field: keyof RSVPFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // アレルギー有無の切り替え
    if (field === 'allergy_flag') {
      setShowAllergyField(value === 1);
      if (value === 0) {
        setFormData(prev => ({ ...prev, allergy: '' }));
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="form bg-white rounded-xl p-8 shadow-lg">
      {/* 出欠選択 */}
      <div className="row attendance text-center mb-8">
        <div className="flex justify-center gap-8">
          <label className="form-check-inline flex items-center cursor-pointer">
            <input
              type="radio"
              name="status"
              value={1}
              checked={formData.status === 1}
              onChange={(e) => updateField('status', parseInt(e.target.value))}
              className="w-5 h-5 mr-3"
            />
            <span className="text-xl font-semibold text-gray-800">ATTEND</span>
          </label>
          <label className="form-check-inline flex items-center cursor-pointer">
            <input
              type="radio"
              name="status"
              value={2}
              checked={formData.status === 2}
              onChange={(e) => updateField('status', parseInt(e.target.value))}
              className="w-5 h-5 mr-3"
            />
            <span className="text-xl font-semibold text-gray-800">ABSENT</span>
          </label>
        </div>
      </div>
      
      {/* ゲストカテゴリー */}
      <FormField
        title={{ ja: "ゲストカテゴリー", en: "Guest Category" }}
        required
      >
        <RadioGroup
          options={[
            { label: "新郎側ゲスト（Groom）", value: 0 },
            { label: "新婦側ゲスト（Bride）", value: 1 }
          ]}
          value={formData.guest_side}
          onChange={(value) => updateField('guest_side', value)}
        />
      </FormField>
      
      {/* 名前 */}
      <FormField
        title={{ ja: "お名前", en: "Name" }}
        required
      >
        <div className="input2 grid grid-cols-2 gap-4">
          <Input
            placeholder="姓"
            value={formData.jpn_family_name}
            onChange={(value) => updateField('jpn_family_name', value)}
            error={errors.jpn_family_name}
          />
          <Input
            placeholder="名"
            value={formData.jpn_first_name}
            onChange={(value) => updateField('jpn_first_name', value)}
            error={errors.jpn_first_name}
          />
        </div>
      </FormField>
      
      {/* かな */}
      <FormField
        title={{ ja: "かな", en: "Kana" }}
      >
        <div className="input2 grid grid-cols-2 gap-4">
          <Input
            placeholder="せい"
            value={formData.kana_family_name || ''}
            onChange={(value) => updateField('kana_family_name', value)}
          />
          <Input
            placeholder="めい"
            value={formData.kana_first_name || ''}
            onChange={(value) => updateField('kana_first_name', value)}
          />
        </div>
      </FormField>
      
      {/* ローマ字 */}
      <FormField
        title={{ ja: "ローマ字", en: "Latin alphabet" }}
        required
      >
        <div className="input2 grid grid-cols-2 gap-4">
          <Input
            placeholder="last name"
            value={formData.rom_family_name}
            onChange={(value) => updateField('rom_family_name', value)}
            error={errors.rom_family_name}
          />
          <Input
            placeholder="first name"
            value={formData.rom_first_name}
            onChange={(value) => updateField('rom_first_name', value)}
            error={errors.rom_first_name}
          />
        </div>
      </FormField>
      
      {/* メールアドレス */}
      <FormField
        title={{ ja: "メールアドレス", en: "Email Address" }}
        required
      >
        <Input
          type="email"
          value={formData.email}
          onChange={(value) => updateField('email', value)}
          error={errors.email}
        />
      </FormField>
      
      {/* 年齢区分 */}
      <FormField
        title={{ ja: "年齢区分", en: "Age Group" }}
      >
        <RadioGroup
          options={[
            { label: "大人Adult", value: 0 },
            { label: "子供Child", value: 1 },
            { label: "幼児Infant", value: 2 }
          ]}
          value={formData.age_category}
          onChange={(value) => updateField('age_category', value)}
        />
      </FormField>
      
      {/* 郵便番号 */}
      <FormField
        title={{ ja: "郵便番号", en: "Postcode" }}
      >
        <div className="input2 grid grid-cols-2 gap-4">
          <Input
            placeholder="ハイフンなし7桁"
            value={formData.zipcode || ''}
            onChange={(value) => updateField('zipcode', value)}
          />
          <div></div>
        </div>
      </FormField>
      
      {/* 住所 */}
      <FormField
        title={{ ja: "住所", en: "Address" }}
      >
        <Input
          value={formData.address || ''}
          onChange={(value) => updateField('address', value)}
        />
      </FormField>
      
      {/* 建物名 */}
      <FormField
        title={{ ja: "建物名", en: "Building" }}
      >
        <Input
          value={formData.address2 || ''}
          onChange={(value) => updateField('address2', value)}
        />
      </FormField>
      
      {/* 電話番号 */}
      <FormField
        title={{ ja: "電話番号", en: "Phone Number" }}
      >
        <Input
          type="tel"
          value={formData.phone_number || ''}
          onChange={(value) => updateField('phone_number', value)}
        />
      </FormField>
      
      {/* 食事制限 */}
      <FormField
        title={{ ja: "食事制限", en: "Dietary Restrictions" }}
        required
      >
        <RadioGroup
          options={[
            { label: "有りWith", value: 1 },
            { label: "無しWithout", value: 0 }
          ]}
          value={formData.allergy_flag}
          onChange={(value) => updateField('allergy_flag', value)}
        />
      </FormField>
      
      {/* アレルギー詳細 */}
      {showAllergyField && (
        <FormField>
          <Input
            placeholder="えび かに くるみ 小麦 そば 卵 乳 落花生 etc."
            value={formData.allergy || ''}
            onChange={(value) => updateField('allergy', value)}
          />
        </FormField>
      )}
      
      {/* メッセージ */}
      <FormField
        title={{ ja: "メッセージ", en: "Message" }}
      >
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-akane-500 focus:border-transparent resize-vertical min-h-[100px]"
          placeholder="MESSAGE"
          value={formData.guest_message || ''}
          onChange={(e) => updateField('guest_message', e.target.value)}
          rows={3}
        />
      </FormField>
      
      {/* 利用規約同意 */}
      <div className="agree mb-8">
        <p className="mb-4">
          <a href="/terms" target="_blank" className="text-akane-500 underline">
            利用規約
          </a>
          をお読みの上 ご登録ください
        </p>
        {/* 同意チェックボックス実装 */}
      </div>
      
      {/* 送信ボタン */}
      <div className="btn-wrap text-center">
        <Button
          type="submit"
          size="lg"
          loading={isLoading}
          className="px-12"
        >
          送信
        </Button>
      </div>
    </form>
  );
};

// フォームフィールドラッパー
const FormField: React.FC<{
  title?: { ja: string; en: string };
  required?: boolean;
  children: React.ReactNode;
}> = ({ title, required = false, children }) => {
  return (
    <div className="row mb-8">
      {title && (
        <div className="tit mb-4">
          <span className="tit-ja block text-lg font-semibold text-gray-800 mb-1">
            {title.ja}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
          <span className="tit-en text-sm text-gray-500 font-playfair">
            {title.en}
          </span>
        </div>
      )}
      {children}
    </div>
  );
};

// ラジオボタングループ
const RadioGroup: React.FC<{
  options: Array<{ label: string; value: number }>;
  value?: number;
  onChange: (value: number) => void;
}> = ({ options, value, onChange }) => {
  return (
    <div className="input-check flex gap-6 flex-wrap">
      {options.map((option, index) => (
        <label key={index} className="form-check flex items-center cursor-pointer">
          <input
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-4 h-4 mr-2"
          />
          <span className="text-base text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};
```

---

## 🎯 実装優先順位

### フェーズ1: コアコンポーネント
1. **LoadingScreen** - ユーザー体験の第一印象
2. **Header** - メインビジュアル
3. **Navigation** - 基本的なサイト操作

### フェーズ2: コンテンツセクション
4. **MessageSection** - 主要コンテンツ
5. **InformationSection** - 必須情報
6. **CountdownSection** - エンゲージメント向上

### フェーズ3: インタラクティブ要素
7. **RSVPForm** - 主要機能
8. **Modal** - ユーザーインタラクション
9. **Footer** - サイト完成度

---

**作成日**: 2025年8月13日  
**最終更新**: 2025年8月13日  
**参照**: reference-site.html
