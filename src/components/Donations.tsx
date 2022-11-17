import { trpc } from "@utils/trpc";

const Donations = () => {
  const { data, isLoading } = trpc.user.getDonations.useQuery();

  if (isLoading) {
    return <p className="text-5xl">Loading...</p>;
  }

  return (
    <>
      {data?.map((d, idx) => {
        return <Donation donation={d} key={idx} />;
      })}
    </>
  );
};

const Donation = ({ donation }: { donation: any }) => {
  return <>
    {JSON.stringify(donation)}
    <button className="btn btn-primary">button</button>
  </>;
};

export default Donations;
