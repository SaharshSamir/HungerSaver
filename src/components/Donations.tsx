import type { Donation as DonationType } from "@prisma/client";
import { trpc } from "@utils/trpc";

const Donations = () => {
  const { data, isLoading } = trpc.user.getDonations.useQuery();
  if (isLoading) {
    return <p className="text-5xl">Loading...</p>;
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="w-5/6 overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Food Type</th>
              <th>Contact</th>
              <th>Expiry</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((d, idx) => {
              return <Donation donation={d} idx={idx} key={idx} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Donation = ({ donation, idx }: { donation: DonationType; idx: number }) => {
  return (
    <>
      <tr>
        <th>{idx + 1}</th>
        <td>{donation.name}</td>
        <td>{donation.quantity}</td>
        <td>{donation.foodType}</td>
        <td>{donation.contact}</td>
        <td>{donation.expiry.getDate()}</td>
        <td>{donation.address}</td>
      </tr>
    </>
  );
};

export default Donations;
