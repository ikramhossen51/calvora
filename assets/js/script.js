// Calvora Global JavaScript
function calculate() {

  const cost = parseFloat(document.getElementById('cost').value);
  const price = parseFloat(document.getElementById('price').value);

  if (isNaN(cost) || isNaN(price) || cost <= 0 || price <= 0) {
    alert("Please enter valid numbers.");
    return;
  }

  const profit = price - cost;
  const margin = (profit / price) * 100;
  const markup = (profit / cost) * 100;

  const profitEl = document.getElementById('profit');
  const marginEl = document.getElementById('margin');
  const markupEl = document.getElementById('markup');

  // Reset classes
  profitEl.className = "value";
  marginEl.className = "value";
  markupEl.className = "value";

  if (profit > 0) {
    profitEl.classList.add("profit");
    marginEl.classList.add("profit");
    markupEl.classList.add("profit");
  } else if (profit < 0) {
    profitEl.classList.add("loss");
    marginEl.classList.add("loss");
    markupEl.classList.add("loss");
  } else {
    profitEl.classList.add("neutral");
    marginEl.classList.add("neutral");
    markupEl.classList.add("neutral");
  }

  profitEl.textContent = profit.toFixed(2);
  marginEl.textContent = margin.toFixed(2) + "%";
  markupEl.textContent = markup.toFixed(2) + "%";

  document.getElementById('result').classList.add('show');
                                           }
