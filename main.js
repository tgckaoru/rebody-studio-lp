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
      e.preventDefault();

      const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="date"]');
      let isValid = true;

      inputs.forEach(input => {
        const formGroup = input.parentElement;

        // すでに表示されているエラーメッセージとエラー状態をリセット
        formGroup.classList.remove("is-error");
        const existingError = formGroup.querySelector(".error-message");
        if (existingError) {
          existingError.remove();
        }

        // 未入力チェック
        if (input.value.trim() === "") {
          isValid = false;

          // 親要素にエラー表示用クラスを追加（見た目はCSSで制御）
          formGroup.classList.add("is-error");

          // エラー文言の作成
          const errorMessage = document.createElement("p");
          errorMessage.className = "error-message";
          errorMessage.textContent = "※必須項目です";

          formGroup.appendChild(errorMessage);
        }
      });

      if (isValid) {
        alert("体験レッスンのご予約ありがとうございます。");
        form.reset();
      }
    });
  }

});