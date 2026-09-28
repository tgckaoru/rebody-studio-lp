console.log("JavaScript読み込み完了");

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. スムーススクロール処理
  // ==========================================
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  // ==========================================
  // 2. お問い合わせフォームのバリデーション処理
  // ==========================================
  const form = document.querySelector(".form");

  if (form) {
    form.addEventListener("submit", (e) => {
      // 本来の送信（ページリロード）をキャンセル
      e.preventDefault();

      // チェック対象の入力項目をまとめて取得
      const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="date"]');
      let isValid = true;

      inputs.forEach(input => {
        // 親要素（.form-group）を取得
        const formGroup = input.parentElement;

        // 以前表示したエラーメッセージがあれば削除（重複表示の防止）
        const existingError = formGroup.querySelector(".error-message");
        if (existingError) {
          existingError.remove();
        }

        // 未入力の場合の判定（トリムして空白のみも判定）
        if (input.value.trim() === "") {
          isValid = false;

          // 1. 枠線を赤色に変更
          input.style.borderColor = "#e06a3b";

          // 2. 赤字のエラーメッセージ要素を作成して入力欄の下に追加
          const errorMessage = document.createElement("p");
          errorMessage.className = "error-message";
          errorMessage.textContent = "※必須項目です";
          errorMessage.style.color = "#e06a3b";
          errorMessage.style.fontSize = "0.85rem";
          errorMessage.style.marginTop = "4px";

          formGroup.appendChild(errorMessage);
        } else {
          // 入力済みの場合は枠線を元に戻す
          input.style.borderColor = "#ccc";
        }
      });

      // 全項目が正しく入力されている場合
      if (isValid) {
        alert("体験レッスンのご予約ありがとうございます。");
        form.reset(); // フォームをクリア
      }
    });
  }

});