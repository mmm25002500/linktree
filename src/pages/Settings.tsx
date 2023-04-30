import Card from "../components/Card";

// Pages
import Profile from "../components/Settings/Profile";
import Account from "../components/Settings/Account";
import Privacy from "../components/Settings/Privacy";

const Settings = () => {
  return (
    <div className="container mx-auto pt-8 pl-5 pr-5 text-black dark:text-white transition-colors duration-100">
      <Card>
        <div className="pb-4">
          <p className="text-3xl">設定</p>
          <p className="text-gray-500 dark:text-gray-400">來管理您的帳戶吧！</p>
        </div>
        <hr />

        <div className="pb-4 pt-4">
          <p className="text-2xl">個人頁面設定</p>
          <p className="text-gray-500 dark:text-gray-400">設定您的專屬頁面</p>
          <Profile></Profile>
        </div>
        <hr />

        <div className="pb-4 pt-4">
          <p className="text-2xl">背景設定</p>
          <p className="text-gray-500 dark:text-gray-400">設定您的專屬背景</p>
        </div>
        <hr />

        <div className="pb-4 pt-4">
          <p className="text-2xl">隱私設定</p>
          <p className="text-gray-500 dark:text-gray-400">設定您的隱私帳戶</p>

          <Privacy></Privacy>
        </div>
        <hr />

        <div className="pb-4 pt-4">
          <p className="text-2xl">帳戶設定</p>
          <p className="text-gray-500 dark:text-gray-400">設定您的個人帳戶</p>

          <Account></Account>
        </div>
        <hr />

      </Card>
    </div>
  )
}

export default Settings;