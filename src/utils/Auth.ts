const users = [
    { name: "A mestre do frontend Julia - Cpa Autralia?", email: 'julia@julia.com', password: 'julia1234' },
    { name: "lucas", email: 'lucas@lucas.com', password: 'lucas1234' },
    { name: "o rolezeiro renan", email: 'renan@renan.com', password: 'renan' },
    { name: "stefany", email: 'stefany@stefany.com', password: 'stefany1234' },
  ];
  
  
export default function verifyLogin(email: string, password: string) {
    return users.find(user => user.email === email && user.password === password) || null;
}
  