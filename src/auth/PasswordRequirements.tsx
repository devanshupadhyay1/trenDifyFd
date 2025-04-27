import React from "react";

interface Props {
  password: string;
}

const PasswordRequirements: React.FC<Props> = ({ password }) => {
  const requirements = [
    { label: "At least 8 characters", test: /.{8,}/ },
    { label: "At least one uppercase letter", test: /[A-Z]/ },
    { label: "At least one lowercase letter", test: /[a-z]/ },
    { label: "At least one number", test: /[0-9]/ },
    { label: "At least one symbol", test: /[!@#$%^&*(),.?":{}|<>]/ },
  ];

  return (
    <ul className="text-sm mt-2 space-y-1">
      {requirements.map((req, idx) => {
        const passed = req.test.test(password);
        return (
          <li key={idx} className={passed ? "text-green-600" : "text-red-600"}>
            {passed ? "✓" : "✗"} {req.label}
          </li>
        );
      })}
    </ul>
  );
};

export default PasswordRequirements;