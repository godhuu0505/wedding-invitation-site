'use client';

import { useState } from 'react';
import SubmitButton from '@/components/ui/SubmitButton';

export default function RSVPForm() {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('yes');
  const [allergyFlag, setAllergyFlag] = useState<'yes' | 'no' | ''>('');
  const [allergyItems, setAllergyItems] = useState<string[]>([]);

  // アレルギー項目の定数
  const allergyOptions = [
    'えび',
    'かに', 
    'くるみ',
    '小麦',
    'そば',
    'たまご',
    '乳',
    '落花生'
  ];

  // アレルギー項目のチェック状態を管理
  const handleAllergyItemChange = (item: string, checked: boolean) => {
    if (checked) {
      setAllergyItems(prev => [...prev, item]);
    } else {
      setAllergyItems(prev => prev.filter(allergyItem => allergyItem !== item));
    }
  };

  // アレルギー有無の変更処理
  const handleAllergyFlagChange = (value: 'yes' | 'no') => {
    setAllergyFlag(value);
    if (value === 'no') {
      setAllergyItems([]); // アレルギーなしの場合はチェック項目をクリア
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション：アレルギーありの場合は最低1つの項目選択が必須
    if (allergyFlag === 'yes' && allergyItems.length === 0) {
      alert('アレルギーありを選択した場合、該当するアレルギー項目を最低1つ選択してください。');
      return;
    }

    await fetch('/rsvp/submit', {
      method: 'POST',
      body: JSON.stringify({ 
        name, 
        attendance, 
        allergyFlag,
        allergyItems: allergyFlag === 'yes' ? allergyItems : []
      }),
    });

    alert('送信ありがとうございました！');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium">お名前</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">出欠</label>
        <select
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
        >
          <option value="yes">出席</option>
          <option value="no">欠席</option>
        </select>
      </div>
      
      {/* アレルギー確認セクション */}
      <div>
        <label className="block text-sm font-medium mb-2">アレルギーはございますか？</label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="allergy"
              value="no"
              checked={allergyFlag === 'no'}
              onChange={() => handleAllergyFlagChange('no')}
              className="mr-2"
            />
            なし
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="allergy"
              value="yes"
              checked={allergyFlag === 'yes'}
              onChange={() => handleAllergyFlagChange('yes')}
              className="mr-2"
            />
            あり
          </label>
        </div>
      </div>

      {/* アレルギー項目チェックボックス（条件付き表示・非活性化） */}
      {allergyFlag === 'yes' && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="block text-sm font-medium mb-3">
            該当するアレルギー項目をチェックしてください（必須）
          </label>
          <div className="grid grid-cols-2 gap-2">
            {allergyOptions.map((item) => (
              <label key={item} className="flex items-center">
                <input
                  type="checkbox"
                  checked={allergyItems.includes(item)}
                  onChange={(e) => handleAllergyItemChange(item, e.target.checked)}
                  className="mr-2 text-akane-500 focus:ring-akane-500"
                />
                {item}
              </label>
            ))}
          </div>
          {allergyFlag === 'yes' && allergyItems.length === 0 && (
            <p className="text-red-500 text-xs mt-2">※ 最低1つの項目を選択してください</p>
          )}
        </div>
      )}

      {/* アレルギー項目チェックボックス（非活性状態） */}
      {allergyFlag === 'no' && (
        <div className="bg-gray-100 p-4 rounded-lg opacity-60">
          <label className="block text-sm font-medium mb-3 opacity-60">
            該当するアレルギー項目をチェックしてください
          </label>
          <div className="grid grid-cols-2 gap-2">
            {allergyOptions.map((item) => (
              <label key={item} className="flex items-center cursor-not-allowed">
                <input
                  type="checkbox"
                  disabled={true}
                  className="mr-2 text-gray-300 cursor-not-allowed"
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="text-center">
        <SubmitButton 
          type="submit"
          className="shadow-lg"
        />
      </div>
    </form>
  );
}
