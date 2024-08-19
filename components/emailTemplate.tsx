interface EmailTemplateProps {
  OTP: number;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  OTP,
}) => (
  <div>
    <p>
      Your OTP for account opening is: 
      <span className="font-bold">{OTP}</span>
    </p>
  </div>
);
