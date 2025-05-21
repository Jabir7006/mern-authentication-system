const About = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">About MERN Auth System</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">
          This is a full-stack authentication system built with:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>MongoDB - Database</li>
          <li>Express.js - Backend framework</li>
          <li>React.js - Frontend framework</li>
          <li>Node.js - Runtime environment</li>
        </ul>
        <p>
          Features include user registration, login, profile management, and
          secure authentication using JWT tokens.
        </p>
      </div>
    </div>
  );
};

export default About;
