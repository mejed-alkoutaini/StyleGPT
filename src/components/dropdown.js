const Dropdown = ({ selectedOption, setSelectedOption, options }) => {
  const handleChange = (event) => {
    const selectedOptionObject = options.find((option) => option.id === event.target.value);

    setSelectedOption(selectedOptionObject);
  };

  return (
    <select className="select select-bordered w-full max-w-xs" value={selectedOption.id} onChange={handleChange}>
      {options.map((i) => (
        <option key={i.id} value={i.id}>
          {i.text}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
