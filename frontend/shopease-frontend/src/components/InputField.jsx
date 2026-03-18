const InputField = ({ type, placeholder }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default InputField;
