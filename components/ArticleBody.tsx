'use client'; // 👈 クリックなどの「動き」をつけるための魔法の言葉

import { useState } from 'react';
import parse, { domToReact, Element } from 'html-react-parser';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Props = {
  contentHtml: string;
};

export default function ArticleBody({ contentHtml }: Props) {
  // ライトボックスが開いているかどうか
  const [open, setOpen] = useState(false);
  // クリックされた画像のURL
  const [imageSrc, setImageSrc] = useState('');

  // HTMLを解析して、画像タグだけ特別な処理をする関数
  const options = {
    replace: (domNode: any) => {
      // もし「imgタグ」だったら...
      if (domNode instanceof Element && domNode.name === 'img') {
        const { src, alt, className } = domNode.attribs;
        return (
          // 普通のimgタグの代わりに、クリックイベントを付けたimgタグを返す
          <img
            src={src}
            alt={alt}
            className={`${className} cursor-pointer hover:opacity-90 transition`} // カーソルを指差しにして、ホバー時に少し薄く
            onClick={() => {
              setImageSrc(src); // クリックされた画像のURLをセット
              setOpen(true);    // ライトボックスを開く
            }}
          />
        );
      }
      // 画像以外はそのまま表示する
      return domToReact(domNode);
    },
  };

  // 記事のHTMLを、上のルールに従って変換する
  const parsedContent = parse(contentHtml, options);

  return (
    <>
      {/* 変換済みの本文を表示する場所 */}
      {/* proseなどのデザインクラスは、親元のページ側で指定します */}
      <div>
        {parsedContent}
      </div>

      {/* 拡大表示用のライトボックス（普段は隠れている） */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: imageSrc }]} // 表示する画像
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.8)" } }} // 背景を少し暗く
      />
    </>
  );
}