module "iam" {
  source = "./modules/iam"
}

module "assets" {
  source = "./modules/assets"
  bucket = "assets.${var.domain}"
}

module "builds" {
  source = "./modules/builds"
  bucket = "builds.${var.domain}"
}

module "tf-backend-s3" {
  source = "./modules/tf-backend-s3"
  bucket = "terraform.${var.domain}"
}

output "lambda_function_role_id" {
  value = "${module.iam.lambda_function_role_id}"
}
