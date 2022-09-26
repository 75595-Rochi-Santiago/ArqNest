import { IEstablishment } from "@modules/authorization/interfaces/establishment.interface";

export const mapEstablishment = (establishments: IEstablishment[]) => {
  return establishments.map(({ id, is_active, users_establishment }) => {
    const {
      city,
      cue,
      id: idEstablishment,
      establishment_name,
      mail,
    } = users_establishment;
    return {
      id,
      is_active,
      details: {
        name: establishment_name,
        mail,
        establishment_id: idEstablishment,
        city,
        cue,
      },
    };
  });
};
