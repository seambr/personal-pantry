import { login, logout, signup } from "./actions"

export default function LoginPage() {
  return (
    <form className="flex flex-col p-5 w-full m-auto sm:w-80 border-2 rounded-md h-[400px] pt-14">
      <label htmlFor="email">Email:</label>
      <input
        className="w-full bg-transparent border-2 rounded-md h-12 p-2 border-secondary"
        id="email"
        name="email"
        type="email"
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        className="w-full bg-transparent border-2 rounded-md h-12 p-2 border-secondary"
        id="password"
        name="password"
        type="password"
        required
      />
      <div className="button-container flex flex-col gap-2 mt-5 w-6/12 justify-center mx-auto">
        <button
          className="h-8 bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          formAction={login}
        >
          Log in
        </button>
        <button
          className="h-8 bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          formAction={signup}
        >
          Sign up
        </button>
      </div>
    </form>
  )
}
