export default function About() {
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">私について</h2>
        
        <div className="bg-white p-8 rounded-xl shadow-md">
          {/* プロフィール画像エリア（後で設定） */}
            <img 
                src="/profile.jpg" 
                alt="プロフィール画像" 
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg"
            />
  
          <h3 className="text-xl font-bold text-center mb-2">Ishiko</h3>
          <p className="text-gray-500 text-center mb-6">プログラミング学習中 / ブロガー</p>
  
          <div className="space-y-4">
            <section>
              <h4 className="font-bold border-b pb-2 mb-2">自己紹介</h4>
              <p className="text-gray-700 leading-relaxed">
                はじめまして。現在プログラミングを勉強しながら、このブログを開発しています。
                日々の学びや気づきをアウトプットしていきます。
              </p>
            </section>
  
            <section>
              <h4 className="font-bold border-b pb-2 mb-2">スキル / 勉強中</h4>
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'TypeScript', 'Tailwind CSS', 'MacBook Air'].map((skill) => (
                  <span key={skill} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }