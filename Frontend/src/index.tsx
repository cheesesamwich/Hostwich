import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const endpoint = 'https://api.hostwich.com';

function Uploader({ token }) {
	async function uploadFile() {
		function prompt(): Promise<File> {
			return new Promise((resolve) => {
				const input = document.createElement('input');
				input.type = 'file';

				input.addEventListener('change', (event: any) => {
					return resolve(event.target.files[0]);
				});

				input.click();
			});
		}

		const file = await prompt();

		const formData = new FormData();
		formData.append('file', file);
		formData.append('token', token);

		const response = await fetch(`${endpoint}/upload?token=${token}`, {
			method: 'POST',
			body: formData,
		});

		console.log(response);

		if (response.ok) {
			await navigator.clipboard.writeText(
				await response.json().then((e) => e.file)
			);

			setUploaded(true);
		}
	}

	const [uploaded, setUploaded] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setUploaded(false);
		}, 1250);
	}, [uploaded]);

	return (
		<div
			className="w-1/6 h-1/6 border-2 rounded-lg border-ctp-mauve bg-ctp-mantle flex items-center justify-center cursor-pointer"
			onClick={() => uploadFile()}
		>
			<h1 className="text-ctp-text text-4xl">
				{uploaded ? 'Copied!' : 'Upload'}
			</h1>
		</div>
	);
}

function Login({ setToken }) {
	const [username, setUsername] = useState('');

	const [password, setPassword] = useState('');

	useEffect(() => {
		const localPassword = localStorage.getItem('pass');
		const localUsername = localStorage.getItem('user');
		if (localPassword && localUsername) {
			setUsername(localUsername);
			setPassword(localPassword);
		}
		Login();
	}, []);

	useEffect(() => {
		if (username != localStorage.getItem('user')) {
			localStorage.setItem('user', username);
		}
		if (password != localStorage.getItem('pass')) {
			localStorage.setItem('pass', password);
		}
	}, [username, password]);

	async function Login() {
		if (!username || !password) return;

		const response = await fetch(
			`${endpoint}/auth?user=${username}&pass=${password}`
		).then((e) => e.json());

		if ('token' in response) {
			setToken(response.token);
		}
	}

	return (
		<div className="flex flex-col gap-2 items-center justify-center">
			<input
				className="bg-ctp-mantle border-2 border-ctp-mauve rounded-lg h-16 text-ctp-text text-2xl p-5 outline-none placeholder-ctp-surface3"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value.slice(0, 20))}
			/>
			<input
				className="bg-ctp-mantle border-2 border-ctp-peach rounded-lg h-16 text-ctp-text text-2xl p-5 outline-none placeholder-ctp-surface3"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value.slice(0, 20))}
			/>
			<div
				className="h-16 bg-ctp-mantle border-ctp-yellow border-2 rounded-lg mt-5 w-1/2 flex items-center justify-center cursor-pointer"
				onClick={() => Login()}
			>
				<h1 className="text-ctp-text text-2xl text-center">Login</h1>
			</div>
		</div>
	);
}
function App() {
	const [token, setToken] = useState('');

	return (
		<div className="w-screen h-screen bg-ctp-base flex items-center justify-center">
			{!token && <Login setToken={setToken} />}
			{token && <Uploader token={token} />}
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
