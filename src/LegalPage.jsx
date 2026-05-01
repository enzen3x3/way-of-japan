export default function LegalPage({ onClose }) {
  return (
    <div className="legal-overlay">
      <div className="legal-modal">
        <button className="legal-close" onClick={onClose}>✕</button>

        <h1 className="legal-title">Legal Information</h1>

        {/* Privacy Policy */}
        <section className="legal-section">
          <h2>Privacy Policy</h2>
          <p><strong>Last updated:</strong> May 1, 2025</p>
          <p>Way of Japan ("we", "us", or "our") operates the Way of Japan web application. This page informs you of our policies regarding the collection, use, and disclosure of personal data.</p>

          <h3>Information We Collect</h3>
          <p>We do not collect personally identifiable information. Usage data (message count) is stored locally on your device only.</p>

          <h3>Payment Information</h3>
          <p>Payments are processed by Stripe. We do not store your payment information. Please review Stripe's Privacy Policy at stripe.com/privacy.</p>

          <h3>Contact</h3>
          <p>Email: enzen3x3@gmail.com</p>
        </section>

        <hr className="legal-divider" />

        {/* Terms of Service */}
        <section className="legal-section">
          <h2>Terms of Service</h2>
          <p><strong>Last updated:</strong> May 1, 2025</p>

          <h3>Service Description</h3>
          <p>Way of Japan provides AI-powered Japanese cultural guidance. Responses are for reference only and may not be fully accurate. Always verify important information with local sources.</p>

          <h3>Free Plan</h3>
          <p>Free users may send up to 5 messages per day in Quick mode only.</p>

          <h3>Paid Plans</h3>
          <p>Weekly Pass ($3.99): Unlimited messages for 7 days, including Deep mode.</p>
          <p>Monthly Pass ($4.99): Unlimited messages for 30 days, including Deep mode.</p>

          <h3>Refund Policy</h3>
          <p>All sales are final. We do not offer refunds once a pass code has been issued.</p>

          <h3>Disclaimer</h3>
          <p>AI responses are generated automatically and may contain errors. Way of Japan is not responsible for any inconvenience caused by reliance on this information.</p>
        </section>

        <hr className="legal-divider" />

        {/* 特定商取引法 */}
        <section className="legal-section">
          <h2>特定商取引法に基づく表記</h2>
          <table className="legal-table">
            <tbody>
              <tr><td>販売業者</td><td>enzen</td></tr>
              <tr><td>運営責任者</td><td>宮地 一希</td></tr>
              <tr><td>所在地</td><td>お問い合わせいただいた際に遅滞なく開示いたします</td></tr>
              <tr><td>電話番号</td><td>お問い合わせいただいた際に遅滞なく開示いたします</td></tr>
              <tr><td>メールアドレス</td><td>enzen3x3@gmail.com</td></tr>
              <tr><td>販売価格</td><td>週パス $3.99 / 月額 $4.99（税込）</td></tr>
              <tr><td>支払方法</td><td>クレジットカード（Stripe経由）</td></tr>
              <tr><td>支払時期</td><td>購入時即時</td></tr>
              <tr><td>サービス提供時期</td><td>決済完了後、コード発行次第即時</td></tr>
              <tr><td>返品・返金</td><td>コード発行後の返品・返金は承っておりません</td></tr>
              <tr><td>動作環境</td><td>インターネット接続環境・モダンブラウザ</td></tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}