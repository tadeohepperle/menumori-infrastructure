import APIINSERVICE from "../APIINSERVICE";

import express, { Request, Response } from "express";
import { Business, BusinessCategory } from "../types";

export const publicBusinessDataHandler = (apiInService: APIINSERVICE) => {
  return async (req: Request, res: Response) => {
    try {
      let slugname = req.params.slugname;
      if (slugname) {
        let business = await apiInService.STARTUPPERFORMER.dataService.getBusinessBySlugname(
          slugname
        );
        // construct object to return to client:
        let publicBusinessData: any = {
          slugname: business?.slugname,
          title: business?.business_settings?.title,
          username: business?.business_settings?.ig_settings?.username,
          street_name: business?.business_settings?.adress?.street_name,
          zip_code: business?.business_settings?.adress?.zip_code,
          city: business?.business_settings?.adress?.city,
          house_number: business?.business_settings?.adress?.house_number,
          description: business?.business_settings?.description,
          business_category: null,
          cover_image: business?.business_settings?.cover_image?.[0]?.url,
        };

        if (
          business &&
          publicBusinessData.slugname &&
          publicBusinessData.city &&
          publicBusinessData.title &&
          publicBusinessData.house_number &&
          publicBusinessData.zip_code &&
          publicBusinessData.username &&
          publicBusinessData.street_name &&
          publicBusinessData.description &&
          publicBusinessData.cover_image &&
          business?.business_settings?.business_category
        ) {
          let business_categroy_id = business.business_settings
            .business_category as string;

          let business_categroy = (await apiInService.STARTUPPERFORMER.dataService.getRecordByID(
            "business-categories",
            business_categroy_id
          )) as BusinessCategory;

          if (business_categroy && business_categroy?.title) {
            publicBusinessData.business_category = {
              title: business_categroy?.title,
            };

            res.json(publicBusinessData);
          } else res.status(400).send();
        } else res.status(400).send();
      } else res.status(400).send();
    } catch (ex) {
      console.error(ex);
      res.status(400).send();
    }
  };
};

export const allPublicBusinessDataHandler = (apiInService: APIINSERVICE) => {
  return async (req: Request, res: Response) => {
    try {
      let businessesProm = apiInService.STARTUPPERFORMER.dataService.getBusinesses();
      let categoriesProm = apiInService.STARTUPPERFORMER.dataService.getRecords(
        "business-categories"
      );

      let [businesses, categoriesRes] = await Promise.all([
        businessesProm,
        categoriesProm,
      ]);
      let categories = categoriesRes as BusinessCategory[];

      // construct object to return to client:

      if (businesses && categories && businesses.length >= 1) {
        let allPublicBusinessData = businesses.map((business) => {
          let publicBusinessData: any = {
            slugname: business?.slugname,
            title: business?.business_settings?.title,
            username: business?.business_settings?.ig_settings?.username,
            street_name: business?.business_settings?.adress?.street_name,
            zip_code: business?.business_settings?.adress?.zip_code,
            city: business?.business_settings?.adress?.city,
            house_number: business?.business_settings?.adress?.house_number,
            description: business?.business_settings?.description,
            cover_image: business?.business_settings?.cover_image?.[0]?.url,
            business_category: { title: "Lokales Unternehmen" },
          };
          let categoryForThisBusiness = categories.find(
            (el) => el._id == business?.business_settings?.business_category
          );

          publicBusinessData.business_category = {
            title: categoryForThisBusiness?.title,
          };
          return publicBusinessData;
        });
        res.json(allPublicBusinessData);
      } else res.status(404).send;
    } catch (ex) {
      console.error(ex);
      res.status(400).send();
    }
  };
};
