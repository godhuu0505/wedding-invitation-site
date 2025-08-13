'use client';

import React from 'react';

export default function MessageSection() {
  return (
    <section id="message" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* セクションタイトル */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-elegant text-akane-600 mb-4">
            Message
          </h2>
          <div className="w-24 h-px bg-akane-300 mx-auto"></div>
        </div>

        {/* 挨拶文 */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-japanese">
              この度は私たちの結婚式にお招きいただき、誠にありがとうございます。
            </p>
          </div>
          
          <div className="bg-akane-50 p-8 md:p-12 rounded-lg shadow-sm">
            <p className="text-base md:text-lg text-gray-800 leading-loose font-japanese text-center">
              二人で歩んできた道のりを振り返り、<br className="hidden md:block" />
              これからも共に支え合い、笑顔溢れる家庭を築いていけるよう、<br className="hidden md:block" />
              お互いを大切にしていきたいと思います。<br /><br />
              
              人生の新たなスタートを迎える私たちを、<br className="hidden md:block" />
              皆様に見守っていただけますよう、<br className="hidden md:block" />
              心よりお願い申し上げます。<br /><br />
              
              当日は心ばかりのおもてなしをご用意してお待ちしております。<br className="hidden md:block" />
              皆様のご都合がつきましたら、ぜひご出席くださいませ。
            </p>
          </div>
        </div>

        {/* 新郎新婦紹介 */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* 新郎 */}
          <div className="text-center">
            <div className="mb-6">
              <div className="w-48 h-48 mx-auto mb-4 bg-gradient-to-br from-akane-100 to-akane-200 rounded-full flex items-center justify-center">
                <span className="text-4xl text-akane-600">👰‍♂️</span>
              </div>
              <h3 className="text-2xl font-elegant text-akane-600 mb-2">Groom</h3>
              <h4 className="text-3xl font-japanese text-gray-800 mb-1">伊藤 尚人</h4>
              <p className="text-lg text-gray-600">Naoto Ito</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed font-japanese">
                趣味：読書、映画鑑賞<br />
                好きな食べ物：寿司、ラーメン<br />
                特技：プログラミング<br />
                結衣さんとの出会いで人生が大きく変わりました。
                これからも一緒に幸せな家庭を築いていきます。
              </p>
            </div>
          </div>

          {/* 新婦 */}
          <div className="text-center">
            <div className="mb-6">
              <div className="w-48 h-48 mx-auto mb-4 bg-gradient-to-br from-akane-100 to-akane-200 rounded-full flex items-center justify-center">
                <span className="text-4xl text-akane-600">👰‍♀️</span>
              </div>
              <h3 className="text-2xl font-elegant text-akane-600 mb-2">Bride</h3>
              <h4 className="text-3xl font-japanese text-gray-800 mb-1">小林 結衣</h4>
              <p className="text-lg text-gray-600">Yui Kobayashi</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm md:text-base text-gray-700 leading-relaxed font-japanese">
                趣味：料理、ガーデニング<br />
                好きな食べ物：パスタ、スイーツ<br />
                特技：ピアノ<br />
                尚人さんと出会えて本当に幸せです。
                お互いを支え合い、笑顔いっぱいの毎日を過ごしています。
              </p>
            </div>
          </div>
        </div>

        {/* 馴れ初め */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl md:text-3xl font-elegant text-akane-600 mb-8">Our Story</h3>
          <div className="bg-gradient-to-r from-akane-50 to-gold-50 p-8 md:p-12 rounded-lg">
            <p className="text-base md:text-lg text-gray-800 leading-loose font-japanese">
              2019年の春、共通の友人の紹介で出会った二人。<br />
              最初はお互い緊張していましたが、映画の話で意気投合し、<br />
              それから頻繁に連絡を取り合うようになりました。<br /><br />
              
              初めてのデートは近所のカフェ。<br />
              お互いの価値観や将来の夢について語り合い、<br />
              この人となら幸せになれると確信しました。<br /><br />
              
              6年間の交際を経て、ついに結婚という新たなステージへ。<br />
              皆様に支えられ、今日という日を迎えることができました。<br />
              心より感謝申し上げます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
