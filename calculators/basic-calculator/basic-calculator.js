/* =====================================================
   BASIC CALCULATOR PAGE
===================================================== */

.basic-calculator-page {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  padding: 40px 20px 80px;
  box-sizing: border-box;
}


/* =====================================================
   CALCULATOR CARD
===================================================== */

.basic-calculator {
  width: 100%;
  max-width: 520px;
  margin: 0 auto 40px;
  padding: 28px;
  background: #111b2e;
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 22px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
}


/* =====================================================
   CALCULATOR HEADER
===================================================== */

.basic-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}


.basic-icon {
  width: 58px;
  height: 58px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(14, 165, 233, 0.10);
  border: 1px solid rgba(14, 165, 233, 0.18);
  border-radius: 16px;

  color: #38bdf8;
}


.basic-icon svg {
  width: 34px;
  height: 34px;
}


.basic-header .calculator-label {
  display: block;
  margin-bottom: 5px;

  color: #38bdf8;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.8px;
  text-transform: uppercase;
}


.basic-header h1 {
  margin: 0;

  color: #f8fafc;
  font-size: 30px;
  line-height: 1.15;
}


.basic-header p {
  margin: 7px 0 0;

  color: #94a3b8;
  font-size: 14px;
  line-height: 1.5;
}


/* =====================================================
   CALCULATOR BOX
===================================================== */

.calculator-box {
  width: 100%;
  padding: 18px;

  background: #0f192b;
  border: 1px solid rgba(148, 163, 184, 0.10);
  border-radius: 18px;

  box-sizing: border-box;
}


/* =====================================================
   CALCULATOR DISPLAY
===================================================== */

.basic-display {
  width: 100%;
  min-height: 105px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;

  padding: 18px 20px;
  margin-bottom: 16px;

  background: #0b1220;
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 16px;

  overflow: hidden;
  box-sizing: border-box;
}


.basic-expression {
  width: 100%;
  min-height: 20px;

  color: #64748b;
  font-size: 14px;
  line-height: 1.4;
  text-align: right;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.basic-result {
  display: block;
  width: 100%;

  color: #f8fafc;
  font-size: 38px;
  font-weight: 700;
  line-height: 1.2;
  text-align: right;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


/* =====================================================
   KEYPAD
===================================================== */

.basic-keypad {
  display: grid;

  grid-template-columns:
    repeat(4, minmax(0, 1fr));

  gap: 10px;
}


/* =====================================================
   CALCULATOR BUTTON
===================================================== */

.calc-key {
  min-width: 0;
  min-height: 62px;

  border: 1px solid rgba(148, 163, 184, 0.10);
  border-radius: 14px;

  background: #182338;
  color: #e2e8f0;

  font-family: inherit;
  font-size: 20px;
  font-weight: 700;

  cursor: pointer;

  transition:
    transform 0.15s ease,
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  -webkit-tap-highlight-color: transparent;
}


.calc-key:hover {
  background: #21304a;
  border-color: rgba(56, 189, 248, 0.25);
}


.calc-key:active {
  transform: scale(0.95);
}


/* =====================================================
   FUNCTION BUTTONS
===================================================== */

.function-key {
  color: #cbd5e1;
  background: #1e293b;
}


.function-key:hover {
  background: #27364d;
}


/* =====================================================
   OPERATOR BUTTONS
===================================================== */

.operator-key {
  color: #38bdf8;
  background: rgba(14, 165, 233, 0.10);
  border-color: rgba(14, 165, 233, 0.18);
}


.operator-key:hover {
  background: rgba(14, 165, 233, 0.18);
}


/* =====================================================
   EQUALS BUTTON
===================================================== */

.equals-key {
  color: #ffffff;
  background: #0284c7;
  border-color: #0284c7;
}


.equals-key:hover {
  background: #0369a1;
}


/* =====================================================
   ZERO BUTTON
===================================================== */

.zero-key {
  grid-column: span 2;
}


/* =====================================================
   SEO CONTENT
===================================================== */

.basic-info {
  width: 100%;
  max-width: 760px;
  margin: 0 auto 35px;
  padding: 28px;

  background: #111b2e;
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 20px;

  box-sizing: border-box;
}


.basic-info h2 {
  margin: 0 0 16px;

  color: #f8fafc;
  font-size: 24px;
  line-height: 1.3;
}


.basic-info h2:not(:first-child) {
  margin-top: 30px;
}


.basic-info p {
  margin: 0 0 16px;

  color: #94a3b8;
  font-size: 15px;
  line-height: 1.75;
}


.basic-info p:last-child {
  margin-bottom: 0;
}


/* =====================================================
   FORMULA BOX
===================================================== */

.formula-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  margin-top: 12px;
  padding: 16px 18px;

  background: #0f192b;
  border: 1px solid rgba(148, 163, 184, 0.10);
  border-radius: 14px;

  box-sizing: border-box;
}


.formula-box span {
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.5;
}


.formula-box strong {
  color: #e2e8f0;
  font-size: 15px;
  text-align: right;
}


.formula-box a {
  color: #38bdf8;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
}


.formula-box a:hover {
  color: #7dd3fc;
}


/* =====================================================
   FAQ
===================================================== */

.basic-faq {
  width: 100%;
  max-width: 760px;
  margin: 0 auto 35px;
}


.basic-faq h2 {
  margin: 0 0 20px;

  color: #f8fafc;
  font-size: 26px;
  line-height: 1.3;
}


.faq-card {
  margin-bottom: 12px;
  padding: 20px;

  background: #111b2e;
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 16px;

  box-sizing: border-box;
}


.faq-card:last-child {
  margin-bottom: 0;
}


.faq-card h3 {
  margin: 0 0 9px;

  color: #f8fafc;
  font-size: 17px;
  line-height: 1.4;
}


.faq-card p {
  margin: 0;

  color: #94a3b8;
  font-size: 14px;
  line-height: 1.7;
}


/* =====================================================
   RELATED CALCULATORS
===================================================== */

.related-calculators {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
}


.related-calculators h2 {
  margin: 0 0 8px;

  color: #f8fafc;
  font-size: 26px;
  line-height: 1.3;
}


.related-calculators > p {
  margin: 0 0 20px;

  color: #94a3b8;
  font-size: 15px;
  line-height: 1.6;
}


.related-grid {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 14px;
}


.related-card {
  display: flex;
  flex-direction: column;
  gap: 8px;

  min-height: 130px;

  padding: 18px;

  background: #111b2e;
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 16px;

  color: inherit;
  text-decoration: none;

  box-sizing: border-box;

  transition:
    transform 0.15s ease,
    border-color 0.15s ease,
    background 0.15s ease;
}


.related-card:hover {
  transform: translateY(-2px);

  background: #16233a;
  border-color: rgba(56, 189, 248, 0.25);
}


.related-card strong {
  color: #f8fafc;
  font-size: 16px;
  line-height: 1.4;
}


.related-card span {
  color: #94a3b8;
  font-size: 13px;
  line-height: 1.6;
}


.all-calculators-link {
  display: inline-block;

  margin-top: 18px;

  color: #38bdf8;
  font-size: 15px;
  font-weight: 700;

  text-decoration: none;
}


.all-calculators-link:hover {
  color: #7dd3fc;
}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 600px) {

  .basic-calculator-page {
    padding: 28px 14px 60px;
  }


  .basic-calculator {
    padding: 20px;
    border-radius: 18px;
  }


  .basic-header {
    gap: 12px;
    margin-bottom: 20px;
  }


  .basic-icon {
    width: 50px;
    height: 50px;
    border-radius: 14px;
  }


  .basic-icon svg {
    width: 30px;
    height: 30px;
  }


  .basic-header h1 {
    font-size: 25px;
  }


  .basic-header p {
    font-size: 13px;
  }


  .calculator-box {
    padding: 14px;
    border-radius: 16px;
  }


  .basic-display {
    min-height: 95px;
    padding: 15px;
  }


  .basic-expression {
    font-size: 13px;
  }


  .basic-result {
    font-size: 32px;
  }


  .basic-keypad {
    gap: 8px;
  }


  .calc-key {
    min-height: 58px;
    border-radius: 12px;
    font-size: 18px;
  }


  .basic-info {
    padding: 21px 18px;
    border-radius: 17px;
  }


  .basic-info h2 {
    font-size: 21px;
  }


  .basic-info p {
    font-size: 14px;
  }


  .formula-box {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }


  .formula-box strong {
    text-align: left;
  }


  .basic-faq h2,
  .related-calculators h2 {
    font-size: 21px;
  }


  .related-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }


  .related-card {
    min-height: auto;
  }

}


/* =====================================================
   SMALL MOBILE
===================================================== */

@media (max-width: 380px) {

  .basic-calculator {
    padding: 16px;
  }


  .basic-header h1 {
    font-size: 22px;
  }


  .basic-header p {
    font-size: 12px;
  }


  .calculator-box {
    padding: 11px;
  }


  .basic-keypad {
    gap: 7px;
  }


  .calc-key {
    min-height: 53px;
    font-size: 17px;
    border-radius: 11px;
  }


  .basic-result {
    font-size: 28px;
  }

}


/* =====================================================
   ACCESSIBILITY
===================================================== */

.calc-key:focus-visible,
.formula-box a:focus-visible,
.related-card:focus-visible,
.all-calculators-link:focus-visible {
  outline: 2px solid #38bdf8;
  outline-offset: 3px;
}


/* =====================================================
   REDUCED MOTION
===================================================== */

@media (prefers-reduced-motion: reduce) {

  .calc-key,
  .related-card {
    transition: none;
  }

}