import { Html, Row, Section, Text, Font } from "@react-email/components";

export default function VerificationEmail({ username, otp }) {
  return (
    <Html lang="en">
      <Section style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <Font family="Arial, sans-serif" />
        <Row>
          <Text>Hello {username},</Text>
        </Row>
        <Row>
          <Text>Here is your OTP for verification: <strong>{otp}</strong></Text>
        </Row>
        <Row>
          <Text>Thank you for using our service!</Text>
        </Row>
        <Row>
          <Text>Best regards,</Text>
        </Row>
        <Row>
          <Text>The Team</Text>
        </Row>
      </Section>
    </Html>
  );
}
