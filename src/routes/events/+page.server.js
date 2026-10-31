// Gets today's temperature in Stockholm from SMHI (task 5: external API).
const SMHI_URL =
	'https://opendata-download-metfcst.smhi.se/api/category/snow1g/version/1/geotype/point/lon/18.07/lat/59.33/data.json';

export async function load({ fetch }) {
	try {
		const response = await fetch(SMHI_URL);
		if (!response.ok) return { temperature: null };

		const forecast = await response.json();
		const temperature = forecast.timeSeries[0].data.air_temperature;
		return { temperature: Math.round(temperature) };
	} catch {
		// If SMHI does not answer, the page still works without the weather
		return { temperature: null };
	}
}
