import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import StripePayment from "../components/StripePayment";
import { useAuth } from "../context/AuthContext";
import { FaCashRegister, FaCreditCard, FaFileInvoiceDollar, FaLock, FaShieldAlt, FaUniversity } from "react-icons/fa";

export default function Payments() {
  const { user } = useAuth();
  const [tab, setTab] = useState("card");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [invoiceReady, setInvoiceReady] = useState(false);

  const canPay = useMemo(() => {
    if (user) return true;
    return invoiceReady && invoiceNumber.trim().length >= 3 && Number(amount) > 0;
  }, [amount, invoiceNumber, invoiceReady, user]);

  const prepareGuestPayment = (e) => {
    e.preventDefault();
    setInvoiceReady(invoiceNumber.trim().length >= 3 && Number(amount) > 0);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="px-6 pt-36 pb-8 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Secure bill pay</p>
        <h1 className="mt-3 text-4xl font-extrabold">Payments</h1>
        <p className="mx-auto mt-2 max-w-2xl text-gray-300">
          Sign in to pay from your account, or enter your invoice number to make a one-time payment without signing in.
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border border-white/10 bg-zinc-950 p-6">
          <div className="mb-4 flex items-center gap-3">
            <FaFileInvoiceDollar className="text-2xl text-emerald-400" />
            <div>
              <h2 className="text-xl font-bold">Choose how to continue</h2>
              <p className="text-sm text-gray-400">Account pay or one-time invoice pay.</p>
            </div>
          </div>

          {user ? (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm">
              <p className="font-semibold text-emerald-200">Signed in as {user.fullName || user.email}</p>
              <p className="mt-1 text-gray-300">You can complete payment using your saved customer context.</p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="rounded-md border border-white/10 bg-white/[0.03] p-4 text-sm text-gray-300">
                Have an account?{" "}
                <Link to="/signin" state={{ from: { pathname: "/payments" } }} className="font-bold text-emerald-300 hover:underline">
                  Sign in to pay your bill
                </Link>
                .
              </div>

              <form onSubmit={prepareGuestPayment} className="space-y-3">
                <label className="block text-sm font-semibold text-gray-200">Pay without signing in</label>
                <input
                  value={invoiceNumber}
                  onChange={(e) => {
                    setInvoiceNumber(e.target.value);
                    setInvoiceReady(false);
                  }}
                  className="w-full rounded-md border border-white/10 bg-zinc-900 p-3"
                  placeholder="Invoice number"
                  required
                />
                <input
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setInvoiceReady(false);
                  }}
                  type="number"
                  min="1"
                  step="0.01"
                  className="w-full rounded-md border border-white/10 bg-zinc-900 p-3"
                  placeholder="Amount due"
                  required
                />
                <button className="w-full rounded-md bg-emerald-500 py-3 font-bold text-black hover:bg-emerald-400">
                  Continue With Invoice
                </button>
                {invoiceReady && <p className="text-sm text-emerald-300">Invoice accepted for one-time payment.</p>}
              </form>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-white/10 bg-zinc-950 p-6">
          <div className="mb-5 flex flex-wrap justify-center gap-2">
            {[
              { id: "card", icon: <FaCreditCard />, label: "Credit/Debit" },
              { id: "ach", icon: <FaUniversity />, label: "ACH / Bank" },
              { id: "onsite", icon: <FaCashRegister />, label: "Pay On-Site" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-md border px-4 py-2 text-sm ${
                  tab === t.id ? "border-emerald-500 bg-emerald-500 text-black" : "border-white/10 bg-zinc-900"
                }`}
              >
                <span className="inline-flex items-center gap-2">{t.icon} {t.label}</span>
              </button>
            ))}
          </div>

          {!canPay ? (
            <div className="rounded-md border border-amber-400/30 bg-amber-400/10 p-5 text-center text-amber-100">
              Sign in or enter an invoice number and amount to unlock payment options.
            </div>
          ) : (
            <>
              {tab === "card" && (
                <StripePayment
                  invoiceNumber={user ? "Account payment" : invoiceNumber}
                  amount={user ? amount : amount}
                  customerName={user?.fullName || user?.email || "Guest payment"}
                />
              )}
              {tab === "ach" && (
                <div className="text-center text-gray-300">
                  <p className="mb-4">Prefer ACH? Request a secure bank transfer link for this bill.</p>
                  <Link to="/contact" className="inline-block rounded-md bg-emerald-500 px-5 py-2 font-bold text-black hover:bg-emerald-400">
                    Request ACH Link
                  </Link>
                </div>
              )}
              {tab === "onsite" && (
                <div className="text-center text-gray-300">
                  <p className="mb-2">We accept card, cash, or check on-site after service is complete.</p>
                  <p className="text-sm text-gray-400">Technicians carry mobile card readers.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-10">
        <div className="grid gap-4 rounded-lg border border-white/10 bg-zinc-950 p-5 text-center md:grid-cols-3">
          <div className="flex items-center justify-center gap-2 text-gray-200"><FaLock className="text-emerald-400" /> Encrypted Checkout</div>
          <div className="flex items-center justify-center gap-2 text-gray-200"><FaShieldAlt className="text-emerald-400" /> Invoice Verification</div>
          <div className="flex items-center justify-center gap-2 text-gray-200"><FaCreditCard className="text-emerald-400" /> Major Cards Accepted</div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="rounded-lg border border-white/10 bg-zinc-950 p-6">
          <h3 className="mb-3 text-xl font-semibold">Payment Questions</h3>
          <ul className="space-y-3 text-gray-300">
            <li><span className="font-semibold text-white">Invoice number:</span> Use the invoice number from your service bill.</li>
            <li><span className="font-semibold text-white">Receipts:</span> Keep the confirmation shown after payment and call if you need a copy resent.</li>
            <li><span className="font-semibold text-white">Deposits:</span> Large installs may require a deposit before scheduling.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
