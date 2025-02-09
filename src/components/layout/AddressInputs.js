export default function AddressInputs({addressProps,setAddressProp,disabled=false}) {
  const {phone, streetAddress, postalCode, city, country} = addressProps;
  return (
    <>
      <label>Телефон</label>
      <input
        disabled={disabled}
        type="tel" placeholder="Номер телефону"
        value={phone || ''} onChange={ev => setAddressProp('phone', ev.target.value)} />
      <label>Адрес вулиці</label>
      <input
        disabled={disabled}
        type="text" placeholder="Адрес вулиці"
        value={streetAddress || ''} onChange={ev => setAddressProp('streetAddress', ev.target.value)}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>Поштовий індекс</label>
          <input
            disabled={disabled}
            type="text" placeholder="Поштовий індекс"
            value={postalCode || ''} onChange={ev => setAddressProp('postalCode', ev.target.value)}
          />
        </div>
        <div>
          <label>Місто</label>
          <input
            disabled={disabled}
            type="text" placeholder="Місто"
            value={city || ''} onChange={ev => setAddressProp('city', ev.target.value)}
          />
        </div>
      </div>
      <label>Країна</label>
      <input
        disabled={disabled}
        type="text" placeholder="Країна"
        value={country || ''} onChange={ev => setAddressProp('country', ev.target.value)}
      />
    </>
  );
}