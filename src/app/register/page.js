"use client";
import {signIn} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {'Content-Type': 'application/json'},
    });
    if (response.ok) {
      setUserCreated(true);
    }
    else {
      setError(true);
    }
    setCreatingUser(false);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Зареєструватися
      </h1>
      {userCreated && (
        <div className="my-4 text-center">
          Користувача створено.<br />
          Зараз ви можете увійти{' '}
          <Link className="underline" href={'/login'}>Увійти &raquo;</Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">          
          Сталася помилка.<br />
          Спробуйте будь-ласка пізніше
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input type="email" placeholder="пошта" value={email}
               disabled={creatingUser}
               onChange={ev => setEmail(ev.target.value)} />
        <input type="password" placeholder="пароль" value={password}
               disabled={creatingUser}
                onChange={ev => setPassword(ev.target.value)}/>
        <button type="submit" disabled={creatingUser}>
          Зареєструватися
        </button>
        <div className="my-4 text-center text-gray-500">
          або увійти через провайдера
        </div>
        <button
          onClick={() => signIn('google', {callbackUrl:'/'})}
          className="flex gap-4 justify-center">
          <Image src={'/google.png'} alt={''} width={24} height={24} />       
           Увійти через Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
        Існує обліковий запис?{' '}
          <Link className="underline" href={'/login'}>Увійти сюди &raquo;</Link>
        </div>
      </form>
    </section>
  );
}