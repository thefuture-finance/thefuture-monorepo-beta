import AddressBook from "../models/addressBook";
export async function getAddressBookByUser(user: string) {
  const addressBook = await AddressBook.find({ user });
  return addressBook;
}

export async function deleteAddress(user: string, address: string) {
  await AddressBook.deleteOne({ user, address });
}

export async function addAddress(
  user: string,
  address: string,
  name: string,
  ens?: string,
) {
  const addressBook = new AddressBook({ user, address, name, ens });
  await addressBook.save();
}
