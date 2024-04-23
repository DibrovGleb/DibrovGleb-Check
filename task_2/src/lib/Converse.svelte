<script lang="ts">
  import { onMount } from "svelte";

  const currencies: string[] = [
    "USD","EUR","RUB","GBP",
    "HKD","JPY", "PLN","TRY"
  ];

  let baseCurrency: string = currencies[0],
      changeCurrency: string = currencies[2],
      amount: number = 1,
      result: number = 0;

  onMount(() => updateConversion());

  const handleBaseCurrencyChange = () => {
    baseCurrency = baseCurrency;
    updateConversion();
  };

  const handleCurrencyChange = () => {
    changeCurrency = changeCurrency;
    updateConversion();
  };

  const handleAmountChange = (e: any) => updateConversion(+e.target.className);

  const updateConversion = async (input?: number) => {
    const response = await fetch("https://open.er-api.com/v6/latest/" + baseCurrency),
          data = await response.json(),
          rates = data.rates,
          exchangeRate = rates[changeCurrency] / rates[baseCurrency];

    input || input == undefined ? result = +(amount * exchangeRate).toFixed(2)
    : amount = +(result / exchangeRate).toFixed(2)
  };
</script>

<div class="container">
  <select bind:value={baseCurrency} on:change={handleBaseCurrencyChange}>
    {#each currencies as currency}
      <option value={currency}>{currency}</option>
    {/each}
  </select>
  <input class="1" type="number"  step="0.1" min="0"
  bind:value={amount} on:input={handleAmountChange}/>
</div>
<div class="container">
  <select bind:value={changeCurrency} on:change={handleCurrencyChange}>
    {#each currencies as currency}
      <option value={currency}>{currency}</option>
    {/each}
  </select>
  <input class="0" type="number" step="0.1" min="0"
  bind:value={result} on:input={handleAmountChange}/>
</div>
